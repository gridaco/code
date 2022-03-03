import { RadialGradient } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import * as dartui from "../dart-ui";

export function radialGradient(g: RadialGradient): flutter.RadialGradient {
  return new flutter.RadialGradient({
    // TODO: add center
    // TODO: add radius
    colors: g.colors.map((c) => dartui.color(c)),
    stops: g.stops,
  });
}
