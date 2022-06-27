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
  JSXWithoutStyleElementConfig,
  JSXWithStyleElementConfig,
  StylesRepository,
} from "@web-builder/core/builders";
import { react as react_config } from "@designto/config";
import { create_duplication_reduction_map } from "@web-builder/styled";
import { makeEsWidgetModuleFile } from "@web-builder/module-es";

/**
 * CSS Module Builder for React Framework
 *
 *
 * - @todo: css file not built
 */
export class ReactCssModuleBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  private readonly stylesMapper: StylesConfigMapBuilder;
  private readonly stylesRepository: StylesRepository;
  private readonly namer: ScopedVariableNamer;
  readonly config: react_config.ReactCssModuleConfig;

  constructor({
    entry,
    config,
  }: {
    entry: JsxWidget;
    config: react_config.ReactCssModuleConfig;
  }) {
    this.entry = entry;
    this.widgetName = entry.key.name;
    this.namer = new ScopedVariableNamer(
      entry.key.id,
      ReservedKeywordPlatformPresets.react
    );

    this.stylesMapper = new StylesConfigMapBuilder(entry, {
      namer: this.namer,
      rename_tag: false /** css-module tag shoule not be renamed */,
    });
    this.stylesRepository = new StylesRepository(
      this.stylesMapper.map,
      create_duplication_reduction_map
    );

    this.config = config;
  }

  private stylesConfig(
    id: string
  ): JSXWithStyleElementConfig | JSXWithoutStyleElementConfig {
    return this.stylesRepository.get(id);
  }

  private jsxBuilder(widget: JsxWidget) {
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
                  cfg.id
                )
              )
            );
          }

          const newattributes = [
            ...(_default_attr ?? []),
            //
            className,
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
    return [this.partImportReact(), this.partImportModuleCss()];
  }

  partImportReact(): ImportDeclaration {
    return react_imports.import_react_from_react;
  }

  partImportModuleCss(): ImportDeclaration {
    return (
      new Import()
        .importDefault(this.config.importDefault)
        // e.g. "./component.module.css"
        .from(`./${this.widgetName}.module.${this.config.lang}`)
        .make()
    );
  }

  partBody(): BlockStatement {
    let jsxTree = this.jsxBuilder(this.entry);
    return new BlockStatement(new Return(jsxTree));
  }

  asExportableModule() {
    const body = this.partBody();
    const imports = this.partImports();
    return new ReactCssModuleWidgetModuleExportable(this.widgetName, {
      body,
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
