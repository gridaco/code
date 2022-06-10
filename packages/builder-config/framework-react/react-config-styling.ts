import type { CssStylingConfig } from "../module-css";

export type ReactStylingStrategy =
  | ReactInlineCssConfig
  | ReactNormalCssConfig
  | ReactCssModuleConfig
  | ReactStyledComponentsConfig;

export type ReactStyledComponentsConfig =
  | ReactTheStyledComponentsConfig
  | ReactEmotionStyledConfig;

export type ReactNormalCssConfig = CssStylingConfig;

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

/**
 * Configuration for css module for react
 *
 *
 * What is css module?
 * ```tsx
 * import styles from "./component.module.css";
 * <div className={styles.box}/>
 * ```
 */
export type ReactCssModuleConfig = Omit<CssStylingConfig, "type"> & {
  type: "css-module";

  /**
   * The name of the css module
   * @deprecated not used
   *
   * - .css
   * - .module.css
   */
  pattern?: string;

  /**
   * the identifier of the css module to use when importing
   *
   * ```
   * import <importDefault> from "./component.module.css";
   * ```
   */
  importDefault: string | "styles";

  /**
   * Loader used for webpack to enable css module feature
   *
   * https://github.com/webpack-contrib/css-loader
   */
  loader: "css-loader";
};
