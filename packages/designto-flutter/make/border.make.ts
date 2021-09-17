import * as flutter from "@bridged.xyz/flutter-builder";
import { ReflectDefaultShapeMixin, ReflectSceneNode } from "@design-sdk/core";
import { roundNumber } from "@reflect-ui/uiutils";
import { makeColor } from "./color.make";

// generate the border, when it exists
export function makeBorder(node: ReflectSceneNode): flutter.Border {
  if (node instanceof ReflectDefaultShapeMixin) {
    if (!node.strokes || node.strokes.length === 0) {
      return undefined;
    }

    // generate the border, when it should exist
    return node.strokeWeight
      ? flutter.Border.all({
          color: makeColor(node.strokes),
          width: roundNumber(node.strokeWeight),
        })
      : undefined;
  }
}
