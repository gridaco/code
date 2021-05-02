import * as flutter from "@bridged.xyz/flutter-builder";
import { nodes } from "@bridged.xyz/design-sdk";

/**
 * Wrap widget with visibility if possible
 */
export function wrapWithVisibility(
  node: nodes.ReflectSceneNode,
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
