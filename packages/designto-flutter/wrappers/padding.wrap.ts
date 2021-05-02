import * as flutter from "@bridged.xyz/flutter-builder";
import { nodes } from "@bridged.xyz/design-sdk";
import { makeEdgeInsets } from "../make/edge-insets.make";

export function wrapWithPadding(
  node:
    | nodes.ReflectFrameNode
    | nodes.ReflectEllipseNode
    | nodes.ReflectRectangleNode,
  child: flutter.Widget
): flutter.Widget {
  const padding = makeEdgeInsets(node);
  if (padding) {
    return new flutter.Padding({
      padding: padding,
      child: child,
    });
  }
  return child;
}
