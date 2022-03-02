export type ReactNativeBlurConfig = {
  layer: "none" | ReactNativeExpoBlurConfig | ReactNativeCommunityBlurConfig;
  background: "none" | null;
  image: ReactNativeImageBlurConfig;
};

/**
 * RN has a built-in blur effect for image based elements - Image, BackgroundImage
 */
interface ReactNativeImageBlurConfig {}

interface ReactNativeExpoBlurConfig {
  module: "expo-blur";
}

interface ReactNativeCommunityBlurConfig {
  module: "@react-native-community/blur";
}
