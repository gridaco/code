import type { Language } from "@grida/builder-platform-types";
import type { ReactComponentExportingCofnig } from "./react-config-exporting-component";
import type { ReactFunctionalComponentDeclarationConfig } from "./react-config-functional-component-declaration";
import type { ReactStylingStrategy } from "./react-config-styling";

export interface ReactFrameworkConfig {
  framework: "react";
  language: Language.jsx | Language.tsx;
  // TODO: rename to css_styling
  styling: ReactStylingStrategy;
  component_declaration_style: {
    exporting_style: ReactComponentExportingCofnig;
    // not supported yet
    declaration_style?: ReactFunctionalComponentDeclarationConfig;
  };
}
