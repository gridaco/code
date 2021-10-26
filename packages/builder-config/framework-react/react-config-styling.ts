export type ReactStylingStrategy =
  | CssInJsxConfig
  | CssStylingConfig
  | ReactStyledComponentsConfig;

interface CssInJsxConfig {
  type: "css-in-jsx";
}

type CssStylingConfig = VanillaCssStylingConfig | ScssStylingConfig;

interface VanillaCssStylingConfig {
  type: "css";
  lang: "css";
}

interface ScssStylingConfig {
  type: "css";
  lang: "scss";
}

export type ReactStyledComponentsConfig =
  | ReactTheStyledComponentsConfig
  | ReactEmotionStyledConfig;

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
