import { MainAxisSize } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function mainAxisSize(m: MainAxisSize): flutter.MainAxisSize {
  switch (m) {
    case MainAxisSize.max:
      return flutter.MainAxisSize.max;
    case MainAxisSize.min:
      return flutter.MainAxisSize.min;
  }
}
