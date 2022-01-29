import { Language } from "@grida/builder-platform-types";
import type { ReactFrameworkConfig } from "../framework-react";
import type { VanillaFrameworkConfig } from "../framework-vanilla";

export type FrameworkConfig =
  | ReactFrameworkConfig
  | FlutterFrameworkConfig
  | VanillaFrameworkConfig;

export type { ReactFrameworkConfig };
export type { VanillaFrameworkConfig };

export interface FlutterFrameworkConfig {
  framework: "flutter";
  language: Language.dart;
}
