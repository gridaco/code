export type FrameworkConfig = ReactFrameworkConfig | FlutterFrameworkConfig;

export interface ReactFrameworkConfig {
  framework: "react";
}

export interface FlutterFrameworkConfig {
  framework: "flutter";
}
