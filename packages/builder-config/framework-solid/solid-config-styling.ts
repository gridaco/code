export type SolidStylingStrategy =
  | SolidStyledComponentsConfig
  | SolidInlineCssConfig;

export type SolidStyledComponentsConfig = SolidOfficialStyledComponentsConfig;

/**
 * the official styled-components module by solidjs team
 * > https://github.com/solidjs/solid-styled-components
 */
interface SolidOfficialStyledComponentsConfig {
  type: "styled-components";
  module: "solid-styled-components";
}

export interface SolidInlineCssConfig {
  type: "inline-css";
}
