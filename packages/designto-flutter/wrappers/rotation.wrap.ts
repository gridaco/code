import * as flutter from "@flutter-builder/flutter";
import { IReflectLayoutMixin } from "@design-sdk/figma-node";

/**
 * https://api.flutter.dev/flutter/widgets/Transform-class.html
 */
export function wrapWithRotation(
  node: IReflectLayoutMixin,
  child: flutter.Widget
): flutter.Widget {
  if (node.rotation !== undefined && child && Math.round(node.rotation) !== 0) {
    //  convert angles to clockwise radians: (angle * -pi/180)
    flutter.Transform.rotate({
      angle: node.rotation * (-3.14159 / 180),
      child: child,
    });
  }
  return child;
}
