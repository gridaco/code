import * as flutter from "@bridged.xyz/flutter-builder";
import { makeTextTheme } from "./make-flutter-text-theme";

export function makeTheme(): flutter.ThemeData {
  return new flutter.ThemeData({
    textTheme: makeTextTheme(),
  });
}
