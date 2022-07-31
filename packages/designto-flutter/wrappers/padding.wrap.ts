import * as flutter from "@flutter-builder/flutter";
import {
  ReflectFrameNode,
  ReflectEllipseNode,
  ReflectRectangleNode,
} from "@design-sdk/figma-node";
import { makeEdgeInsets } from "../make/edge-insets.make";

export function wrapWithPadding(
  node: ReflectFrameNode | ReflectEllipseNode | ReflectRectangleNode,
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
