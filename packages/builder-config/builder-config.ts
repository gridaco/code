import type { DesignSourceConfig } from "./designsource";
import type { FrameworkConfig } from "./framework";
export interface BuilderConfig {
  name: string;
  designsource: DesignSourceConfig;
  framework: FrameworkConfig;
}
