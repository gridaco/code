import * as flutter from "@flutter-builder/flutter";
import * as painting from "../painting";
import { makeColor } from "./make-flutter-color";
import {
  ReflectRectangleNode,
  ReflectEllipseNode,
  ReflectFrameNode,
} from "@design-sdk/figma-node";

/**
 * [Flutter#ShapeBorder](https://api.flutter.dev/flutter/painting/ShapeBorder-class.html)
 * @deprecated TODO: this is not fully implemented.
 * @param node
 * @returns
 */
export function makeShape(
  node: ReflectRectangleNode | ReflectEllipseNode | ReflectFrameNode
): flutter.ShapeBorder {
  const strokeColor = makeColor(node.strokes);
  const side: flutter.BorderSide =
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
    borderRadius: painting.borderRadius(node.cornerRadius),
  });
}
