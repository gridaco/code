import type { BoxShadowManifest } from "@reflect-ui/core";
import type { ViewStyle, ColorValue } from "react-native";
import * as css from "@web-builder/styles";
import { reactnative } from "@grida/builder-config";

export function shadow(
  p: BoxShadowManifest,
  /**
   * @deprecated NOT READY
   */
  config?: reactnative.ReactNativeShadowConfig
): ViewStyle {
  return <ViewStyle>{
    shadowColor: css.color(p.color), // global property
    // iOS only
    shadowOffset: {
      width: p.offset.dx,
      height: p.offset.dy,
    },
    // iOS only
    // shadowOpacity: p.color.opacity,
    // iOS only
    shadowRadius: p.spreadRadius,
    // Android only
    elevation: anddroid_elevation(p),
  };
}

/**
 * Convert a box-shadow to anddroid native compat elevation value (aprox.)
 * https://material.io/design/environment/elevation.html
 * @returns
 */
const anddroid_elevation = (p: BoxShadowManifest) => {
  // FIXME: add elevation convert support
  return 8;
};
