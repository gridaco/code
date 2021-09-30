import * as flutter from "@flutter-builder/flutter";
import { nodes } from "@design-sdk/core";
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
