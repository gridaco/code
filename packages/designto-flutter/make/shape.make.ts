import * as flutter from "@bridged.xyz/flutter-builder";
import { nodes } from "@bridged.xyz/design-sdk";
import { makeBorderRadius } from "./border-radius.make";
import { makeColor } from "./color.make";

// TODO this is not fully implemented.
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
