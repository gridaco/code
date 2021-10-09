import { Language } from "@grida/builder-platform-types";
import type { ReactFrameworkConfig } from "../framework-react";

export type FrameworkConfig =
  | ReactFrameworkConfig
  | FlutterFrameworkConfig
  | VanillaFrameworkConfig;

export type { ReactFrameworkConfig };

export interface FlutterFrameworkConfig {
  framework: "flutter";
  language: Language.dart;
}

export interface VanillaFrameworkConfig {
  framework: "vanilla";
  language: Language.html;
}
