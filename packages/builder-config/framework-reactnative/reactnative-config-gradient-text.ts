export interface ReactNativeTextGradientConfig {
  linear:
    | ReactNativeLinearTextGradientConfig
    | ReactNativeTextGradientFallbackConfig;
  radial: ReactNativeTextGradientFallbackConfig;
}

export type ReactNativeLinearTextGradientConfig =
  ReactNativeLinearTextGradientModuleConfig;

/**
 * "[react-native-text-gradient](https://github.com/iyegoroff/react-native-text-gradient)"
 * 
 * ```tsx
  import { LinearTextGradient } from "react-native-text-gradient";

  <LinearTextGradient
    style={{ fontWeight: "bold", fontSize: 72 }}
    locations={[0, 1]}
    colors={["red", "blue"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    THIS IS TEXT GRADIENT
  </LinearTextGradient>;
 * ```
 * 
 * - last module update: 2020-09-11
 */
interface ReactNativeLinearTextGradientModuleConfig {
  module: "react-native-text-gradient";
}

/**
 * The fallback strategy for text gradients on react-native
 * Since the linear, radial and conic gradients are not natively supported by react-native,
 * we need to use a fallback strategy if non external modules are specified.
 */
type ReactNativeTextGradientFallbackConfig =
  | RNTextGradientFallbackType
  | RNTextGradientFallbackType[];

type RNTextGradientFallbackType =
  | "fallback-to-svg"
  | "fallback-to-png"
  | "fallback-to-first-color"
  | "fallback-to-black"
  | "fallback-to-white"
  | "fallback-to-close-bw";
