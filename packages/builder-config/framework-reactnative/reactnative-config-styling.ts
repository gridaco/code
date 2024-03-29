export type ReactNativeStylingStrategy =
  | ReactNativeInlineStyleConfig
  | ReactNativeStyleSheetConfig
  | ReactNativeStyledComponentsConfig;

/**
 * The default react-native styling strategy
 */
export interface ReactNativeStyleSheetConfig {
  type: "react-native-stylesheet";
  /**
   * import { StyleSheet } from "react-native";
   */
  module: "react-native";
}

/**
 * Inline css styling for react-native without using StyleSheet
 *
 * ```tsx
 * // examples
 * <View style={{backgroundColor: "black", width: 50, height: 50}}/>
 * <View style={box_style}/>
 * ```
 */
export interface ReactNativeInlineStyleConfig {
  type: "inline-style";
}

export type ReactNativeStyledComponentsConfig =
  | ReactStyledComponentsNativeConfig
  | ReactEmotionNativeStyledConfig;

/**
 * 'styled-components/native' config - https://styled-components.com/docs/basics#react-native
 */
interface ReactStyledComponentsNativeConfig {
  type: "styled-components";
  module: "styled-components/native";
}

/**
 * Configuration of styled from "@emotion/native" - https://emotion.sh/docs/@emotion/native
 */
interface ReactEmotionNativeStyledConfig {
  type: "styled-components";
  module: "@emotion/native";
}
