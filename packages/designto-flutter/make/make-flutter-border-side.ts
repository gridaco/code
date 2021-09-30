import { ReflectDefaultShapeMixin } from "@design-sdk/core";
import * as flutter from "@flutter-builder/flutter";
import { roundNumber } from "@reflect-ui/uiutils";
import { makeColor } from "./make-flutter-color";

export function makeBorderSide(node: ReflectDefaultShapeMixin) {
  // TODO -> move this as member method
  if (!node.strokes || node.strokes.length === 0) {
    return undefined;
  }

  return new flutter.BorderSide({
    color: makeColor(node.strokes),
    width: roundNumber(node.strokeWeight),
  });
}
