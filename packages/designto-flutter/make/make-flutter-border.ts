import * as flutter from "@flutter-builder/flutter";
import { ReflectDefaultShapeMixin, ReflectSceneNode } from "@design-sdk/core";
import { roundNumber } from "@reflect-ui/uiutils";
import { makeColor } from "./make-flutter-color";

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
