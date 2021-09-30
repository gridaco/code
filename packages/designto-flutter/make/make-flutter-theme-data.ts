import * as flutter from "@flutter-builder/flutter";
import { makeTextTheme } from "./make-flutter-text-theme";

export function makeTheme(): flutter.ThemeData {
  return new flutter.ThemeData({
    textTheme: makeTextTheme(),
  });
}
