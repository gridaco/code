import type { Language } from "@grida/builder-platform-types";
import type { ReactNativeStylingStrategy } from "./reactnative-config-styling";
import type {
  ReactComponentExportingCofnig,
  ReactFunctionalComponentDeclarationConfig,
} from "../framework-react";
import type { ReactNativeSvgConfig } from "./reactnative-config-svg";
import type { ReactNativeGradientConfig } from "./reactnative-config-gradient";
import type { ReactNativeTextGradientConfig } from "./reactnative-config-gradient-text";
import type { ReactNativeShadowConfig } from "./reactnative-config-shadow";

export interface ReactNativeFrameworkConfig {
  framework: "react-native";
  language: Language.jsx | Language.tsx;
  styling: ReactNativeStylingStrategy;
  gradient: ReactNativeGradientConfig;
  gradient_text: ReactNativeTextGradientConfig;
  shadow: ReactNativeShadowConfig;
  svg: ReactNativeSvgConfig;
  component_declaration_style: {
    exporting_style: ReactComponentExportingCofnig;
    // not supported yet
    declaration_style?: ReactFunctionalComponentDeclarationConfig;
  };
}
