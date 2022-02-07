export type ReactStylingStrategy =
  | ReactInlineCssConfig
  | ReactCssStylingConfig
  | ReactStyledComponentsConfig;

export type ReactStyledComponentsConfig =
  | ReactTheStyledComponentsConfig
  | ReactEmotionStyledConfig;
export type ReactCssStylingConfig = CssStylingConfig;

type CssStylingConfig = VanillaCssStylingConfig | ScssStylingConfig;

interface VanillaCssStylingConfig {
  type: "css";
  lang: "css";
}

interface ScssStylingConfig {
  type: "css";
  lang: "scss";
}

/**
 * "The" styled-components config - https://styled-components.com/
 */
interface ReactTheStyledComponentsConfig {
  type: "styled-components";
  module: "styled-components";
}

/**
 * @emotion/styled config - https://emotion.sh/
 */
interface ReactEmotionStyledConfig {
  type: "styled-components";
  module: "@emotion/styled";
}

/**
 * Inline css styling
 *
 * ```tsx
 * // examples
 * <div style={{background: "black", width: 50, height: 50}}/>
 * <div style={box_style}/>
 * ```
 */
export interface ReactInlineCssConfig {
  type: "inline-css";
}
