import { LinearGradient } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import { alignment } from "./painting-alignment";
import * as dartui from "../dart-ui";

export function linearGradient(g: LinearGradient): flutter.LinearGradient {
  return new flutter.LinearGradient({
    begin: alignment(g.begin),
    end: alignment(g.end),
    colors: g.colors.map((c) => dartui.color(c)),
    stops: g.stops,
  });
}
