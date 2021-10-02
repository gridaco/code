import { Offset } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function offset(o: Offset): flutter.Offset {
  const { dx, dy } = o;
  if (requiredOffset(o)) {
    return new flutter.Offset(dx, dy);
  }
}

/**
 * returns undefined, if offset is redundant.
 */
function requiredOffset(offset: Offset): Offset {
  if (offset.dx == 0 && offset.dy == 0) {
    return undefined;
  }
  return offset;
}
