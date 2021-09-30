import * as flutter from "@flutter-builder/flutter";
import { nodes } from "@design-sdk/core";
import { makeBorderRadius } from "./make-flutter-border-radius";
import { makeColor } from "./make-flutter-color";

/**
 * [Flutter#ShapeBorder](https://api.flutter.dev/flutter/painting/ShapeBorder-class.html)
 * @deprecated TODO: this is not fully implemented.
 * @param node
 * @returns
 */
export function makeShape(
  node:
    | nodes.ReflectRectangleNode
    | nodes.ReflectEllipseNode
    | nodes.ReflectFrameNode
): flutter.ShapeBorder {
  const strokeColor = makeColor(node.strokes);
  const side: flutter.Border =
    strokeColor && node.strokeWeight > 0
      ? new flutter.BorderSide({
          width: node.strokeWeight,
          color: strokeColor,
        })
      : undefined;

  if (node.type === "ELLIPSE") {
    return new flutter.CircleBorder({
      side: side,
    });
  }

  return new flutter.RoundedRectangleBorder({
    side: side,
    borderRadius: makeBorderRadius(node),
  });
}
