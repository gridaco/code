import { ReactInlineCssBuilder } from "@web-builder/react";
import { preact_imports } from "../preact-import-specifications";

export class PreactInlineCssBuilder extends ReactInlineCssBuilder {
  partImports() {
    return [preact_imports.import_h_from_preact];
  }
}
