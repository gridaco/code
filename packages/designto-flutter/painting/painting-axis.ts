import { Axis } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function axis(a: Axis): flutter.Axis {
  switch (a) {
    case Axis.horizontal:
      return flutter.Axis.horizontal;
    case Axis.vertical:
      return flutter.Axis.vertical;
  }
}
