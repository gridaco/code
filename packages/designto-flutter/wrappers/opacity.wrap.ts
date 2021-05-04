import * as flutter from "@bridged.xyz/flutter-builder";
import { nodes } from "@design-sdk/core";

/**
 * Wrap widget with opacity if possible
 */
export function wrapWithOpacity(
  node: nodes.IReflectBlendMixin,
  child: flutter.Widget
): flutter.Widget {
  if (node.opacity !== undefined && node.opacity !== 1 && child) {
    return new flutter.Opacity({
      opacity: node.opacity,
      child: child,
    });
  }
  return child;
}
