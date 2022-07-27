import type { Framework } from "@grida/builder-platform-types";
import type { JsxWidget } from "@web-builder/core";
import type {
  StylesConfigMapBuilder,
  JSXWithoutStyleElementConfig,
  JSXWithStyleElementConfig,
  StylesRepository,
} from "@web-builder/core/builders";
import type { WidgetDeclarationDocumentation } from "@code-features/documentation";
import type { EsWidgetModuleExportable } from "@web-builder/module-es";
import type {
  BlockStatement,
  ImportDeclaration,
  JSXChildLike,
  ScopedVariableNamer,
} from "coli";

export abstract class JSXWidgetModuleBuilder<CONFIG> {
  readonly entry: JsxWidget;
  readonly widgetName: string;
  readonly config: CONFIG;
  protected readonly namer: ScopedVariableNamer;
  protected readonly stylesRepository: StylesRepository;
  protected readonly stylesMapper: StylesConfigMapBuilder;

  constructor({
    entry,
    config,
    namer,
  }: {
    entry: JsxWidget;
    config: CONFIG;
    namer: ScopedVariableNamer;
    framework: Framework;
  }) {
    this.entry = entry;
    this.widgetName = entry.key.name;
    this.config = config;
    this.namer = namer;
    this.stylesMapper = this.initStylesConfigMapBuilder();
    const _stylesRepository = this.initStylesRepository();
    if (_stylesRepository) {
      this.stylesRepository = _stylesRepository;
    }
  }

  protected abstract initStylesConfigMapBuilder(): StylesConfigMapBuilder;

  protected abstract initStylesRepository(): StylesRepository | false;

  protected stylesConfig(
    id: string
  ): JSXWithStyleElementConfig | JSXWithoutStyleElementConfig {
    if (this.stylesRepository) {
      return this.stylesRepository.get(id);
    }
    return this.stylesMapper.map.get(id)!;
  }

  protected abstract jsxBuilder(widget: JsxWidget): JSXChildLike;

  protected abstract partDocumentation():
    | WidgetDeclarationDocumentation
    | undefined;

  protected abstract partImports(): Array<ImportDeclaration>;

  protected abstract partBody(): BlockStatement;

  abstract asExportableModule(): EsWidgetModuleExportable;
}
