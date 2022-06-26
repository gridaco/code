import type { Language } from "@grida/builder-platform-types";
import type { SolidComponentExportingCofnig } from "./solid-config-exporting-component";
import type { SolidStylingStrategy } from "./solid-config-styling";

/**
 * builder configuration input for solidjs applications
 */
export interface SolidFrameworkConfig {
  framework: "solidjs";
  language: Language.jsx | Language.tsx;
  styling: SolidStylingStrategy;
  component_declaration_style: {
    exporting_style: SolidComponentExportingCofnig;
  };
}
