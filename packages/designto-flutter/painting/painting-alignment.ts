import { Alignment } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function alignment(a: Alignment): flutter.Alignment {
  // TODO: Alignemt value comparison won't work. (not tested)
  switch (a) {
    case Alignment.center: {
      return flutter.Alignment.center;
    }
    case Alignment.topLeft: {
      return flutter.Alignment.topLeft;
    }
    case Alignment.topCenter: {
      return flutter.Alignment.topCenter;
    }
    case Alignment.topRight: {
      return flutter.Alignment.topRight;
    }
    case Alignment.centerLeft: {
      return flutter.Alignment.centerLeft;
    }
    case Alignment.centerRight: {
      return flutter.Alignment.centerRight;
    }
    case Alignment.bottomLeft: {
      return flutter.Alignment.bottomLeft;
    }
    case Alignment.bottomCenter: {
      return flutter.Alignment.bottomCenter;
    }
    case Alignment.bottomRight: {
      return flutter.Alignment.bottomRight;
    }
    default: {
      return new flutter.Alignment(a.x, a.y);
    }
  }
}
