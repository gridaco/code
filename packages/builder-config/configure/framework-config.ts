import { Language } from "@grida/builder-platform-types";
import { ReactStylingStrategy } from "../framework-react";

export type FrameworkConfig = ReactFrameworkConfig | FlutterFrameworkConfig;

export interface ReactFrameworkConfig {
  framework: "react";
  language: Language.jsx | Language.tsx;
  styling: ReactStylingStrategy;
}

export interface FlutterFrameworkConfig {
  framework: "flutter";
  language: Language.dart;
}
