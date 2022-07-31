import * as flutter from "@flutter-builder/flutter";
import type { ReflectSceneNode } from "@design-sdk/figma-node";

/**
 * Wrap widget with visibility if possible
 */
export function wrapWithVisibility(
  node: ReflectSceneNode,
  child: flutter.Widget
): flutter.Widget {
  if (node.visible !== undefined && node.visible === false && child) {
    return new flutter.Visibility({
      visible: node.visible,
      child: child,
    });
  }
  return child;
}
