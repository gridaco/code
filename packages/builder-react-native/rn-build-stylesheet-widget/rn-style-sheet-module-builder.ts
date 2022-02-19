import { ScopedVariableNamer } from "@coli.codes/naming";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import {
  BlockStatement,
  Declaration,
  Identifier,
  ImportDeclaration,
  JSXAttribute,
  PropertyAccessExpression,
  PropertySignature,
  Return,
} from "coli";
import {
  react_imports,
  makeReactModuleFile,
  ReactWidgetModuleExportable,
} from "@web-builder/react-core";
import { JsxWidget } from "@web-builder/core";
import {
  buildJsx,
  getWidgetStylesConfigMap,
  JSXWithoutStyleElementConfig,
  JSXWithStyleElementConfig,
  WidgetStyleConfigMap,
} from "@web-builder/core/builders";
import {
  react as react_config,
  reactnative as rn_config,
} from "@designto/config";
import { reactnative_imports } from "../rn-import-specifications";
import { StyleSheetDeclaration } from "../rn-style-sheet";

export class ReactNativeStyleSheetModuleBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  private readonly stylesConfigWidgetMap: WidgetStyleConfigMap;
  private readonly namer: ScopedVariableNamer;
  readonly config: rn_config.ReactNativeStyleSheetConfig;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: rn_config.ReactNativeStyleSheetConfig;
  }) {
    this.entry = entry;
    this.widgetName = entry.key.name;
    this.namer = new ScopedVariableNamer(
      entry.key.id,
      ReservedKeywordPlatformPresets.react
    );
    this.stylesConfigWidgetMap = getWidgetStylesConfigMap(entry, {
      namer: this.namer,
      rename_tag: false /** rn StyleSheet tag shoule not be renamed */,
    });
    this.config = config;
  }

  private stylesConfig(
    id: string
  ): JSXWithStyleElementConfig | JSXWithoutStyleElementConfig {
    return this.stylesConfigWidgetMap.get(id);
  }

  private jsxBuilder(widget: JsxWidget) {
    // e.g. const styles = StyleSheet.create({...});
    const stylesheetDeclarationIdentifier = new Identifier("styles");
    const style_attr_name = "style";

    return buildJsx(
      widget,
      {
        styledConfig: (id) => {
          const cfg = this.stylesConfig(id);
          const _default_attr = cfg.attributes;

          const existing_classname_attr = _default_attr?.find(
            // where style refers to react's jsx style attribute
            (a) => a.name.name === style_attr_name
          );

          let styleAttr: JSXAttribute;
          if (existing_classname_attr) {
            // ignore this case. (element already with style attriibute may be svg element)
            // this case is not supported. (should supported if the logic changes)
          } else {
            styleAttr = new JSXAttribute(
              style_attr_name,
              new BlockStatement(
                new PropertyAccessExpression(
                  new PropertySignature({
                    name: stylesheetDeclarationIdentifier,
                  }),
                  // TODO: this currently generates styles.ClassName, but it also should be compatible with
                  // - styles.className
                  // - styles.["class-name"]
                  cfg.id
                )
              )
            );
          }

          const newattributes = [
            ...(_default_attr ?? []),
            //
            styleAttr,
          ];

          cfg.attributes = newattributes;

          return cfg;
        },
      },
      {
        self_closing_if_possible: true,
      }
    );
  }

  partImports(): Array<ImportDeclaration> {
    return [this.partImportReact(), this.partImportReactNative()];
  }

  partImportReact(): ImportDeclaration {
    return react_imports.import_react_from_react;
  }

  partImportReactNative(): ImportDeclaration {
    return reactnative_imports.import_react_prepacked;
  }

  partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  partStyleSheetDeclaration(): StyleSheetDeclaration<any> {
    const styles = Array.from(this.stylesConfigWidgetMap.keys()).reduce(
      (p, c) => {
        const cfg = this.stylesConfig(c);
        return {
          ...p,
          [cfg.id]: "style" in cfg && cfg.style,
        };
      },
      {}
    );

    return new StyleSheetDeclaration("styles", {
      styles: styles,
    });
  }

  asExportableModule() {
    const body = this.partBody();
    const imports = this.partImports();
    const declarations = this.partStyleSheetDeclaration();
    return new ReactStyleSheeteWidgetModuleExportable(this.widgetName, {
      body,
      imports,
      stylesheetDeclaraion: declarations,
    });
  }
}

export class ReactStyleSheeteWidgetModuleExportable extends ReactWidgetModuleExportable {
  readonly declarations: Declaration[];
  constructor(
    name,
    {
      body,
      imports,
      stylesheetDeclaraion,
    }: {
      body: BlockStatement;
      imports: ImportDeclaration[];
      stylesheetDeclaraion: StyleSheetDeclaration<any>;
    }
  ) {
    super({
      name,
      body,
      imports,
    });

    this.declarations = [stylesheetDeclaraion];
  }

  asFile({
    exporting,
  }: {
    exporting: react_config.ReactComponentExportingCofnig;
  }) {
    return makeReactModuleFile({
      name: this.name,
      path: "src/components",
      imports: this.imports,
      declarations: this.declarations,
      body: this.body,
      config: {
        exporting: exporting,
      },
    });
  }
}
