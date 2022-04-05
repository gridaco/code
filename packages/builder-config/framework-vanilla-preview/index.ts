import type { VanillaFrameworkConfig } from "../framework-vanilla";

export interface VanillaPreviewFrameworkConfig
  extends Omit<VanillaFrameworkConfig, "framework"> {
  framework: "preview";
}
