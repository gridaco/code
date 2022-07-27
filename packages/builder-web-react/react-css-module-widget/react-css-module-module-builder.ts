import { ScopedVariableNamer } from "@coli.codes/naming";
import { ReservedKeywordPlatformPresets } from "@coli.codes/naming/reserved";
import {
  BlockStatement,
  Identifier,
  Import,
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
import { react as react_config } from "@designto/config";
import { create_duplication_reduction_map } from "@web-builder/styled";
import { makeEsWidgetModuleFile } from "@web-builder/module-es";
import { Framework } from "@grida/builder-platform-types";
import { JSXWidgetModuleBuilder } from "@web-builder/module-jsx";
import { extractMetaFromWidgetKey } from "@designto/token/key";
import {
  ReactWidgetDeclarationDocBuilder,
  WidgetDeclarationDocumentation,
} from "@code-features/documentation";

/**
 * CSS Module Builder for React Framework
 *
 *
 * - @todo: css file not built
 */
export class ReactCssModuleBuilder extends JSXWidgetModuleBuilder<react_config.ReactCssModuleConfig> {
  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: react_config.ReactCssModuleConfig;
  }) {
    super({
      entry,
      config,
      framework: Framework.react,
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
        rename_tag: false /** css-module tag shoule not be renamed */,
      },
      Framework.react
    );
  }

  protected initStylesRepository(): false | StylesRepository {
    return new StylesRepository(
      this.stylesMapper.map,
      create_duplication_reduction_map
    );
  }

  protected jsxBuilder(widget: JsxWidget) {
    // e.g. import styles from "./?.module.css"
    const importedCssIdentifier = new Identifier(this.config.importDefault);

    return buildJsx(
      widget,
      {
        styledConfig: (id) => {
          const cfg = this.stylesConfig(id);
          const _default_attr = cfg.attributes;

          const existing_classname_attr = _default_attr?.find(
            // where style refers to react's jsx style attribute
            (a) => a.name.name === "className"
          );

          let className: JSXAttribute;
          if (existing_classname_attr) {
            // ignore this case. (element already with style attriibute may be svg element)
            // this case is not supported. (should supported if the logic changes)
          } else {
            className = new JSXAttribute(
              "className",
              new BlockStatement(
                new PropertyAccessExpression(
                  new PropertySignature({
                    name: importedCssIdentifier,
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
            className!,
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
    return [this.partImportReact(), this.partImportModuleCss()];
  }

  protected partImportReact(): ImportDeclaration {
    return react_imports.import_react_from_react;
  }

  protected partImportModuleCss(): ImportDeclaration {
    return (
      new Import()
        .importDefault(this.config.importDefault)
        // e.g. "./component.module.css"
        .from(`./${this.widgetName}.module.${this.config.lang}`)
        .make()
    );
  }

  protected partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  protected partDocumentation() {
    const metafromkey = extractMetaFromWidgetKey(this.entry.key);
    const docstr = new ReactWidgetDeclarationDocBuilder({
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

  public asExportableModule() {
    const doc = this.partDocumentation();
    const body = this.partBody();
    const imports = this.partImports();
    return new ReactCssModuleWidgetModuleExportable(this.widgetName, {
      body,
      documentation: doc,
      imports,
    });
  }
}

export class ReactCssModuleWidgetModuleExportable extends ReactWidgetModuleExportable {
  constructor(
    name,
    {
      body,
      imports,
      documentation,
    }: {
      body: BlockStatement;
      documentation: WidgetDeclarationDocumentation;
      imports: ImportDeclaration[];
    }
  ) {
    super({
      name,
      body,
      imports,
      documentation,
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
