import type { Language } from "@grida/builder-platform-types";
import { EsComponentExportingCofnig } from "../module-es";
import { JsxFunctionalComponentDeclarationConfig } from "./jsx-config-functional-component-declaration";

export interface JsxModuleConfig {
  language: Language.jsx | Language.tsx;
  component_declaration_style: {
    exporting_style: EsComponentExportingCofnig;
    // not supported yet
    declaration_style?: JsxFunctionalComponentDeclarationConfig;
  };
}
