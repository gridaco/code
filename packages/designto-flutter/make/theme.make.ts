import * as flutter from "@bridged.xyz/flutter-builder";
import { makeTextTheme } from "./text-theme.make";

export function makeTheme(): flutter.ThemeData {
  return new flutter.ThemeData({
    textTheme: makeTextTheme(),
  });
}
