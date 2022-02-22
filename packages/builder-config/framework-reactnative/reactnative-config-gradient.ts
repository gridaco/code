/**
 * react-native's gradient support build config
 *
 * Learn more
 * - [Does React Native styles support gradients?](https://stackoverflow.com/questions/32027965/does-react-native-styles-support-gradients)
 */
export interface ReactNativeGradientConfig {
  linear: ReactNativeLinearGradientConfig | ReactNativeGradientFallbackConfig;
  /**
   * radial gradient for react-native is not yet supported.
   */
  radial: ReactNativeRadialGradientConfig | ReactNativeGradientFallbackConfig;
}

export type ReactNativeLinearGradientConfig =
  | ReactNativeLinearGradientModuleConfig
  | ExpoLinearGradientModuleConfig;

/**
 * The fallback strategy for gradients on react-native
 * Since the linear, radial and conic gradients are not natively supported by react-native,
 * we need to use a fallback strategy if non external modules are specified.
 */
interface ReactNativeGradientFallbackConfig {
  type: "fallback-to-svg" | "fallback-to-png";
}

/**
 *
 */
export type ReactNativeRadialGradientConfig =
  ReactNativeRadialGradientModuleConfig;

/**
 * Module config of "react-native-radial-gradient"
 *
 * ```tsx
 * // e.g.
 * import { RadialGradient } from "react-native-radial-gradient";
 * ```
 */
interface ReactNativeRadialGradientModuleConfig {
  module: "react-native-radial-gradient";
}

/**
 * The "[react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)" module config
 *
 *
 * ```tsx
 * // e.g.
 * import { LinearGradient } from "react-native-linear-gradient";
 * ```
 */
interface ReactNativeLinearGradientModuleConfig {
  module: "react-native-linear-gradient";
}

/**
 * https://docs.expo.dev/versions/latest/sdk/linear-gradient/
 *
 *
 * ```tsx
 * // e.g.
 * import { LinearGradient } from 'expo-linear-gradient';
 * <LinearGradient
 *     colors={['rgba(0,0,0,0.8)', 'transparent']}
 *     style={styles.background}
 * />
 * const styles = StyleSheet.create({ ... });
 * ```
 *
 * **Platform Compatibility**
 * - Android Device     ✅
 * - Android Emulator   ✅
 * - iOS Device         ✅
 * - iOS Simulator      ✅
 * - Web                ✅
 *
 */
interface ExpoLinearGradientModuleConfig {
  module: "expo-linear-gradient";
}
