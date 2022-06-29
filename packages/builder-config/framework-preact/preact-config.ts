import type { Language } from "@grida/builder-platform-types";
import type { ReactFrameworkConfig } from "../framework-react";
import type { JsxModuleConfig } from "../module-jsx/jsx-config";
import type { PreactComponentExportingCofnig } from "./preact-config-exporting-component";
import type { PreactFunctionalComponentDeclarationConfig } from "./preact-config-functional-component-declaration";
import type { PreactStylingStrategy } from "./preact-config-styling";

export interface PreactFrameworkConfig
  extends JsxModuleConfig,
    Omit<ReactFrameworkConfig, "framework"> {
  framework: "preact";
  language: Language.jsx | Language.tsx;
  styling: PreactStylingStrategy;
  component_declaration_style: {
    exporting_style: PreactComponentExportingCofnig;
    declaration_style?: PreactFunctionalComponentDeclarationConfig;
  };
}
