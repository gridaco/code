import { BoxShape } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function boxshape(shape: BoxShape): flutter.BoxShape {
  if (!shape) {
    return;
  }

  switch (shape) {
    case BoxShape.circle:
      return flutter.BoxShape.circle as flutter.BoxShape;
    case BoxShape.rectangle:
      return flutter.BoxShape.rectangle as flutter.BoxShape;
    default:
      throw new Error("Unknown BoxShape: " + shape);
  }
}
