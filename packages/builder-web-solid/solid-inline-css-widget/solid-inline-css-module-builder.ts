import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import { solid as solid_config } from "@designto/config";
import type { JsxWidget } from "@web-builder/core";
import { solid_js_imports } from "@web-builder/solid-js";
import {
  buildJsx,
  StylesConfigMapBuilder,
  JSXWithoutStyleElementConfig,
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
  StringLiteral,
  TemplateLiteral,
} from "coli";
import { cssToJson } from "@web-builder/styles/_utils";
import { CSSProperties } from "@coli.codes/css";
import {
  EsWidgetModuleExportable,
  makeEsWidgetModuleFile,
} from "@web-builder/module-es";
import { Framework } from "@grida/builder-platform-types";
import { JSXWidgetModuleBuilder } from "@web-builder/module-jsx";

/**
 * InlineCss Style builder for SolidJS Framework
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
export class SolidInlineCssBuilder extends JSXWidgetModuleBuilder<solid_config.SolidInlineCssConfig> {
  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: solid_config.SolidInlineCssConfig;
  }) {
    super({
      entry,
      config,
      framework: Framework.solid,
      namer: new ScopedVariableNamer(
        entry.key.id,
        ReservedKeywordPlatformPresets.solidjs
      ),
    });
  }

  protected initStylesConfigMapBuilder(): StylesConfigMapBuilder {
    return new StylesConfigMapBuilder(
      this.entry,
      {
        namer: this.namer,
        rename_tag: false,
      },
      Framework.solid
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
            // where style refers to solid's jsx style attribute
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
            const solidStyleData = cssToJson(styledata, {
              camelcase: false,
            });
            const properties: PropertyAssignment[] = Object.keys(
              solidStyleData
            ).map(
              (key) =>
                new PropertyAssignment({
                  // optional string literal assignment when key is kebab-cased
                  name: key.includes("-")
                    ? new StringLiteral(key)
                    : new Identifier(key),
                  initializer: new TemplateLiteral(solidStyleData[key]),
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
    return [solid_js_imports.render];
  }

  protected partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  public asExportableModule() {
    const body = this.partBody();
    const imports = this.partImports();
    return new SolidInlineCssWidgetModuleExportable(this.widgetName, {
      body,
      imports,
    });
  }
}

export class SolidInlineCssWidgetModuleExportable extends EsWidgetModuleExportable {
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
    exporting: solid_config.SolidComponentExportingCofnig;
  }) {
    return makeEsWidgetModuleFile({
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
