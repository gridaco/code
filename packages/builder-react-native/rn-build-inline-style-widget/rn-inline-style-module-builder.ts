import { ReservedKeywordPlatformPresets } from "@coli.codes/naming";
import {
  react as react_config,
  reactnative as reactnative_config,
} from "@designto/config";
import type { JsxWidget } from "@web-builder/core";
import { Framework } from "@grida/builder-platform-types";
import {
  react_imports,
  ReactWidgetModuleExportable,
} from "@web-builder/react-core";
import {
  buildJsx,
  StylesConfigMapBuilder,
  JSXWithStyleElementConfig,
  StylesRepository,
} from "@web-builder/core/builders";
import {
  BlockStatement,
  Identifier,
  ImportDeclaration,
  JSXAttribute,
  ObjectLiteralExpression,
  PropertyAssignment,
  Return,
  ScopedVariableNamer,
  TemplateLiteral,
} from "coli";
import { cssToJson } from "@web-builder/styles/_utils";
import { CSSProperties } from "@coli.codes/css";
import { reactnative_imports } from "..";
import { makeEsWidgetModuleFile } from "@web-builder/module-es";
import { JSXWidgetModuleBuilder } from "@web-builder/module-jsx";
import { extractMetaFromWidgetKey } from "@designto/token/key";
import {
  ReactNativeWidgetDeclarationDocBuilder,
  WidgetDeclarationDocumentation,
} from "@code-features/documentation";

/**
 * CSS In JS Style builder for React Framework
 *
 *
 * css in js is a pattern that allows you to use css as a object in jsx, to property `style`.
 *
 * ```tsx
 * // output be like...
 * <div style={{ color: "red" }}/>
 * ```
 *
 */
export class ReactNativeInlineStyleBuilder extends JSXWidgetModuleBuilder<reactnative_config.ReactNativeInlineStyleConfig> {
  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: reactnative_config.ReactNativeInlineStyleConfig;
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

  protected initStylesConfigMapBuilder() {
    return new StylesConfigMapBuilder(
      this.entry,
      {
        namer: this.namer,
        rename_tag: false,
      },
      Framework.reactnative
    );
  }

  protected initStylesRepository(): false | StylesRepository {
    return false;
  }

  protected jsxBuilder(widget: JsxWidget) {
    return buildJsx(
      widget,
      {
        styledConfig: (id) => {
          const cfg = this.stylesConfig(id);
          const _default_attr = cfg.attributes;

          const existingstyleattr = _default_attr?.find(
            // where style refers to react-native's jsx style attribute
            (a) => a.name.name === "style"
          );

          let style: JSXAttribute;
          if (existingstyleattr) {
            // ignore this case. (element already with style attriibute may be svg element)
            // this case is not supported. (should supported if the logic changes)
          } else {
            //
            const styledata: CSSProperties =
              (cfg as JSXWithStyleElementConfig).style ?? {};
            const reactStyleData = cssToJson(styledata, {
              camelcase: true,
            });
            const properties: PropertyAssignment[] = Object.keys(
              reactStyleData
            ).map(
              (key) =>
                new PropertyAssignment({
                  name: key as unknown as Identifier,
                  initializer: new TemplateLiteral(reactStyleData[key]),
                })
            );

            style = new JSXAttribute(
              "style",
              new BlockStatement(
                new ObjectLiteralExpression({
                  properties: properties,
                })
              )
            );
          }

          const newattributes = [
            ...(_default_attr ?? []),
            //
            style!,
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

  protected partImports() {
    return [
      react_imports.import_react_from_react,
      reactnative_imports.import_react_native_prepacked,
    ];
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

  asExportableModule() {
    const doc = this.partDocumentation();
    const body = this.partBody();
    const imports = this.partImports();
    return new ReactNativeInlineStyleWidgetModuleExportable(this.widgetName, {
      body,
      imports,
      documentation: doc,
    });
  }
}

export class ReactNativeInlineStyleWidgetModuleExportable extends ReactWidgetModuleExportable {
  constructor(
    name,
    {
      body,
      imports,
      documentation,
    }: {
      body: BlockStatement;
      imports: ImportDeclaration[];
      documentation: WidgetDeclarationDocumentation;
    }
  ) {
    super({
      name,
      body,
      imports,
      documentation: documentation,
    });
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
      declarations: [],
      body: this.body,
      documentation: this.documentation,
      config: {
        exporting: exporting,
      },
    });
  }
}
