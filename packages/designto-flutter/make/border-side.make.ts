import { ReflectDefaultShapeMixin } from "@bridged.xyz/design-sdk/lib/nodes";
import * as flutter from "@bridged.xyz/flutter-builder";
import { roundNumber } from "@reflect-ui/uiutils";
import { makeColor } from "./color.make";

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
