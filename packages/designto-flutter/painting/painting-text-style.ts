import type { ITextStyle, TextShadowManifest } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import { textDecoration } from "./painting-text-decoration";
import { fontStyle } from "./painting-font-style";
import * as dartui from "../dart-ui";
import { rd } from "../_utils";
import * as length from "../length";

export function textStyle(style: ITextStyle): flutter.TextStyle {
  const { fontFamily, letterSpacing } = style;
  let decoration: flutter.TextDecoration = textDecoration(style.decoration);
  const fontWeight: flutter.FontWeight = flutter.FontWeight[style.fontWeight];

  return new flutter.TextStyle({
    fontSize: rd(style.fontSize),
    fontWeight: fontWeight,
    fontFamily: fontFamily,
    color: dartui.color(style.color),
    fontStyle: fontStyle(style.fontStyle),
    letterSpacing: length.letterSpacing(style.fontSize, letterSpacing),
    height: rd(length.multiple(style.fontSize, style.lineHeight)),
    decoration: decoration,
    shadows: dartui.shadow(style.textShadow),
  });
}
