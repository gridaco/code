import { Framework } from "@grida/builder-platform-types";
import type { JsxWidget } from "@web-builder/core";
import {
  StylesConfigMapBuilder,
  JSXWithoutStyleElementConfig,
  JSXWithStyleElementConfig,
  StylesRepository,
} from "@web-builder/core/builders";
import {
  BlockStatement,
  ImportDeclaration,
  JSXChildLike,
  ScopedVariableNamer,
} from "coli";

export abstract class JsxComponentModuleBuilder<CONFIG> {
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

  protected abstract partImports(): Array<ImportDeclaration>;

  protected abstract partBody(): BlockStatement;

  abstract asExportableModule();
}
