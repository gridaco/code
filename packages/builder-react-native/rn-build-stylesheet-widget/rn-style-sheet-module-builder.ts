import { ScopedVariableNamer } from "@coli.codes/naming";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming";
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
  ReactWidgetModuleExportable,
} from "@web-builder/react-core";
import { JsxWidget } from "@web-builder/core";
import {
  buildJsx,
  StylesConfigMapBuilder,
  StylesRepository,
} from "@web-builder/core/builders";
import {
  react as react_config,
  reactnative as rn_config,
} from "@designto/config";
import { reactnative_imports } from "../rn-import-specifications";
import { StyleSheetDeclaration } from "../rn-style-sheet";
import { create_duplication_reduction_map } from "@web-builder/styled";
import { makeEsWidgetModuleFile } from "@web-builder/module-es";
import { Framework } from "@grida/builder-platform-types";
import { JSXWidgetModuleBuilder } from "@web-builder/module-jsx";
import { extractMetaFromWidgetKey } from "@designto/token/key";
import {
  ReactNativeWidgetDeclarationDocBuilder,
  WidgetDeclarationDocumentation,
} from "@code-features/documentation";
export class ReactNativeStyleSheetModuleBuilder extends JSXWidgetModuleBuilder<rn_config.ReactNativeStyleSheetConfig> {
  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: rn_config.ReactNativeStyleSheetConfig;
  }) {
    super({
      entry,
      config,
      framework: Framework.reactnative,
      namer: new ScopedVariableNamer(
        entry.key.id,
        ReservedKeywordPlatformPresets.react
      ),
    });
  }

  protected initStylesConfigMapBuilder(): StylesConfigMapBuilder {
    return new StylesConfigMapBuilder(
      this.entry,
      {
        namer: this.namer,
        rename_tag: false /** rn StyleSheet tag shoule not be renamed */,
      },
      Framework.reactnative
    );
  }

  protected initStylesRepository(): false | StylesRepository {
    return new StylesRepository(
      this.stylesMapper.map,
      create_duplication_reduction_map
    );
  }

  protected jsxBuilder(widget: JsxWidget) {
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
                  cfg.id!
                )
              )
            );
          }

          const newattributes = [
            ...(_default_attr ?? []),
            //
            styleAttr!,
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

  protected partImports(): Array<ImportDeclaration> {
    return [this.partImportReact(), this.partImportReactNative()];
  }

  protected partImportReact(): ImportDeclaration {
    return react_imports.import_react_from_react;
  }

  protected partImportReactNative(): ImportDeclaration {
    return reactnative_imports.import_react_native_prepacked;
  }

  protected partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  protected partDocumentation() {
    const metafromkey = extractMetaFromWidgetKey(this.entry.key);
    const docstr = new ReactNativeWidgetDeclarationDocBuilder({
      module: {
        ...metafromkey,
      },
      declaration: {
        type: "unknown",
        identifier: this.widgetName,
      },
      params: undefined,
      defaultValues: undefined,
    }).make();
    return docstr;
  }

  protected partStyleSheetDeclaration(): StyleSheetDeclaration<any> {
    const styles = Array.from(this.stylesRepository.uniques()).reduce(
      (p, c) => {
        const cfg = this.stylesConfig(c);
        return {
          ...p,
          [cfg.id!]: "style" in cfg && cfg.style,
        };
      },
      {}
    );

    return new StyleSheetDeclaration("styles", {
      styles: styles,
    });
  }

  public asExportableModule() {
    const doc = this.partDocumentation();
    const body = this.partBody();
    const imports = this.partImports();
    const declarations = this.partStyleSheetDeclaration();
    return new ReactNativeStyleSheeteWidgetModuleExportable(this.widgetName, {
      body,
      imports,
      documentation: doc,
      stylesheetDeclaraion: declarations,
    });
  }
}

export class ReactNativeStyleSheeteWidgetModuleExportable extends ReactWidgetModuleExportable {
  readonly declarations: Declaration[];
  constructor(
    name,
    {
      body,
      imports,
      documentation,
      stylesheetDeclaraion,
    }: {
      body: BlockStatement;
      imports: ImportDeclaration[];
      documentation: WidgetDeclarationDocumentation;
      stylesheetDeclaraion: StyleSheetDeclaration<any>;
    }
  ) {
    super({
      name,
      body,
      imports,
      documentation,
    });

    this.declarations = [stylesheetDeclaraion];
  }

  asFile({
    exporting,
  }: {
    exporting: react_config.ReactComponentExportingCofnig;
  }) {
    return makeEsWidgetModuleFile({
      name: this.name,
      path: "src/components",
      imports: this.imports,
      declarations: this.declarations,
      documentation: this.documentation,
      body: this.body,
      config: {
        exporting: exporting,
      },
    });
  }
}
