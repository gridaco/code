/**
 * ReactNative does not have a very nice way to work with shadow natively across the platforms.
 *
 * Learn more
 * - https://reactnative.dev/docs/shadow-props
 * - https://medium.com/game-development-stuff/how-to-apply-shadows-on-react-native-fa745d374ae7
 * - https://stackoverflow.com/questions/45972506/creating-a-ui-with-box-shadow-in-react-native
 * - https://blog.logrocket.com/applying-box-shadows-in-react-native/
 */
export type ReactNativeShadowConfig =
  | RNNativeShadowConfig
  | RNShadow1ModuleConfig
  | RNShadow2ModuleConfig;

export interface RNNativeShadowConfig {
  type: "react-native";
  module: "react-native";
  ios?: RNIOSShadowConfig;
  android?: RNAndroidShadowConfig;
  //
}

interface RNIOSShadowConfig {}
interface RNAndroidShadowConfig {}

/**
 * @deprecated use react-native-shadow-2 instead
 *
 * Learn more - https://github.com/879479119/react-native-shadow
 */
export interface RNShadow1ModuleConfig {
  type: "react-native-shadow-1";
  module: "react-native-shadow";
}

/**
 * Learn more - https://github.com/SrBrahma/react-native-shadow-2
 */
export interface RNShadow2ModuleConfig {
  type: "react-native-shadow-2";
  module: "react-native-shadow-2";
}
