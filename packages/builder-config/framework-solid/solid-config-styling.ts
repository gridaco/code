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

/**
 * Inline css styling
 *
 * ```tsx
 * // examples
 * <div style={{background: "black", width: 50, height: 50, "font-weight": 800}}/>
 * <div style={box_style}/>
 * ```
 */
export interface SolidInlineCssConfig {
  type: "inline-css";
}
