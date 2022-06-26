import {
  ScopedVariableNamer,
  ReservedKeywordPlatformPresets,
} from "@coli.codes/naming";
import {
  NoStyleJSXElementConfig,
  StyledComponentJSXElementConfig,
} from "@web-builder/styled";
import {
  react_imports,
  makeReactModuleFile,
  ReactWidgetModuleExportable,
  emotion_styled_imports,
  styled_components_imports,
} from "@web-builder/react-core";
import { JsxWidget } from "@web-builder/core";
import { BlockStatement, ImportDeclaration, Return } from "coli";
import {
  buildJsx,
  StylesConfigMapBuilder,
  StylesRepository,
} from "@web-builder/core/builders";
import { solid as solid_config } from "@designto/config";
import {
  StyledComponentDeclaration,
  create_duplication_reduction_map,
} from "@web-builder/styled";
import { solid_styled_components_imports } from "../solid-import-specifications";

export class SolidStyledComponentsBuilder {
  private readonly entry: JsxWidget;
  private readonly widgetName: string;
  private readonly stylesMapper: StylesConfigMapBuilder;
  private readonly stylesRepository: StylesRepository;
  private readonly namer: ScopedVariableNamer;
  readonly config: solid_config.SolidStyledComponentsConfig;

  partImportStyled() {
    switch (this.config.module) {
      case "solid-styled-components":
        return solid_styled_components_imports.import_styled;
    }
    throw (
      `Unexpected solidjs styled components module identifier: ` +
      this.config.module
    );
  }
}
