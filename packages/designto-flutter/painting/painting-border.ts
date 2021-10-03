import * as flutter from "@flutter-builder/flutter";
import { Border } from "@reflect-ui/core";
import { borderside } from "./painting-border-side";

// generate the border, when it exists
export function border(border: Border): flutter.Border {
  if (!border) {
    return;
  }

  if (
    // at least one side of the border's width shoul be higher than 0.
    border.left?.width ||
    border.right?.width ||
    border.top?.width ||
    border.bottom?.width
  ) {
    return new flutter.Border({
      left: border.left ? borderside(border.left) : flutter.BorderSide.none,
      top: border.top ? borderside(border.top) : flutter.BorderSide.none,
      right: border.right ? borderside(border.right) : flutter.BorderSide.none,
      bottom: border.bottom
        ? borderside(border.bottom)
        : flutter.BorderSide.none,
    });
  }

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
