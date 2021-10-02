import type { ITextStyle } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import { textDecoration } from "./painting-text-decoration";
import { fontStyle } from "./painting-font-style";

export function textStyle(style: ITextStyle): flutter.TextStyle {
  const { fontFamily, letterSpacing } = style;
  let decoration: flutter.TextDecoration = textDecoration(style.decoration);
  const fontWeight: flutter.FontWeight = flutter.FontWeight[style.fontWeight];

  return new flutter.TextStyle({
    fontSize: style.fontSize,
    fontWeight: fontWeight,
    fontFamily: fontFamily,
    // percentage is not supported
    fontStyle: fontStyle(style.fontStyle),
    letterSpacing: letterSpacing,
    decoration: decoration,
  });
}
