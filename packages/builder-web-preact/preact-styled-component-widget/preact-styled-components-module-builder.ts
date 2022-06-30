import { ReactStyledComponentsBuilder } from "@web-builder/react/react-styled-component-widget";
import { preact_imports } from "../preact-import-specifications";

/**
 * Preact styled-components builder. extends from react styled-components builder, overrides only main module imports (from "preact").
 */
export class PreactStyledComponentsBuilder extends ReactStyledComponentsBuilder {
  protected partImports() {
    return [this.partImportPreact(), this.partImportStyled()];
  }

  protected partImportPreact() {
    return preact_imports.import_h_from_preact;
  }

  protected partImportReact(): never {
    throw "do not import react from preact module. this is forbidden.";
  }
}
