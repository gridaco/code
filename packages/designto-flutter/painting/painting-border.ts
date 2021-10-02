import * as flutter from "@flutter-builder/flutter";
import { Border } from "@reflect-ui/core";
import { borderside } from "./painting-border-side";

// generate the border, when it exists
export function border(border: Border): flutter.Border {
  if (!border) {
    return;
  }

  return new flutter.Border({
    left: borderside(border.left),
    top: borderside(border.top),
    right: borderside(border.right),
    bottom: borderside(border.bottom),
  });

  // TODO: support shorthands.
  // 1. flutter.Border.all
  // 2. flutter.Border.fromBorderSide
  // 3. flutter.Border.symmetric

  // border.
  // generate the border, when it should exist
  // return node.strokeWeight
  //   ? flutter.Border.all({
  //       color: makeColor(node.strokes),
  //       width: roundNumber(node.strokeWeight),
  //     })
  //   : undefined;
}
