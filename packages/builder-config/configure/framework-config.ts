import type { Language } from "@grida/builder-platform-types";
import type { ReactFrameworkConfig } from "../framework-react";
import type { ReactNativeFrameworkConfig } from "../framework-reactnative";
import type { VanillaFrameworkConfig } from "../framework-vanilla";

export type FrameworkConfig =
  | ReactFrameworkConfig
  | ReactNativeFrameworkConfig
  | FlutterFrameworkConfig
  | VanillaFrameworkConfig;

export type { ReactFrameworkConfig };
export type { VanillaFrameworkConfig };

export interface FlutterFrameworkConfig {
  framework: "flutter";
  language: Language.dart;
}
