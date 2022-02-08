import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import { react as react_config } from "@designto/config";
import type { JSXElementConfig, JsxWidget } from "@web-builder/core";
import {
  buildJsx,
  getWidgetStylesConfigMap,
  JSXWithoutStyleElementConfig,
  JSXWithStyleElementConfig,
  WidgetStyleConfigMap,
} from "@web-builder/core/builders";
import {
  BlockStatement,
  Identifier,
  ImportDeclaration,
  JSXAttribute,
  Literal,
  ObjectLiteralExpression,
  PropertyAssignment,
  Return,
  ScopedVariableNamer,
  StringLiteral,
} from "coli";
import * as css from "@web-builder/styles";
import { react_imports } from "../react-import-specifications";
import { ReactWidgetModuleExportable } from "../react-module";
import { makeReactModuleFile, ReactModuleFile } from "../react-module-file";
import { cssToJson } from "@web-builder/styles/_utils";
import { CSSProperties } from "@coli.codes/css";

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
export class ReactCssInJSBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  readonly config: react_config.ReactInlineCssConfig;
  private readonly namer: ScopedVariableNamer;
  private readonly styledConfigWidgetMap: WidgetStyleConfigMap;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: react_config.ReactInlineCssConfig;
  }) {
    this.entry = entry;
    this.widgetName = entry.key.name;
    this.config = config;
    this.namer = new ScopedVariableNamer(
      entry.key.id,
      ReservedKeywordPlatformPresets.react
    );
    this.styledConfigWidgetMap = getWidgetStylesConfigMap(entry, {
      namer: this.namer,
      rename_tag: false,
    });
  }

  private styledConfig(
    id: string
  ): JSXWithStyleElementConfig | JSXWithoutStyleElementConfig {
    return this.styledConfigWidgetMap.get(id);
  }

  private jsxBuilder(widget: JsxWidget) {
    return buildJsx(
      widget,
      {
        styledConfig: (id) => {
          const cfg = this.styledConfig(id);
          const _default_attr = cfg.attributes;

          const existingstyleattr = _default_attr?.find(
            // where style refers to react's jsx style attribute
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
            const reactStyleData = cssToJson(styledata);
            const properties: PropertyAssignment[] = Object.keys(
              reactStyleData
            ).map(
              (key) =>
                new PropertyAssignment({
                  name: key as unknown as Identifier,
                  initializer: new StringLiteral(reactStyleData[key]),
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
            style,
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

  partImports() {
    return [react_imports.import_react_from_react];
  }

  partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  asExportableModule() {
    const body = this.partBody();
    const imports = this.partImports();
    return new ReactInlineCssWidgetModuleExportable(this.widgetName, {
      body,
      imports,
    });
  }
}

export class ReactInlineCssWidgetModuleExportable extends ReactWidgetModuleExportable {
  constructor(
    name,
    {
      body,
      imports,
    }: {
      body: BlockStatement;
      imports: ImportDeclaration[];
    }
  ) {
    super({
      name,
      body,
      imports,
    });
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
      declarations: [],
      body: this.body,
      config: {
        exporting: exporting,
      },
    });
  }
}
