import { VerticalDirection } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function verticalDirection(
  vd: VerticalDirection
): flutter.VerticalDirection {
  switch (vd) {
    case VerticalDirection.up:
      return flutter.VerticalDirection.up as flutter.VerticalDirection;
    case VerticalDirection.down:
      return flutter.VerticalDirection.down as flutter.VerticalDirection;
  }
  throw new Error(`unknown vertical direction ${vd}`);
}
