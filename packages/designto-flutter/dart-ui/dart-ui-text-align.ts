import * as core from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function textAlign(textalign: core.TextAlign): flutter.TextAlign {
  // only undefined in testing

  // we are not handling "left" align, because it will be set by default.
  switch (textalign) {
    case core.TextAlign.start:
      return flutter.TextAlign.start as flutter.TextAlign;

    case core.TextAlign.right:
      return flutter.TextAlign.right as flutter.TextAlign;

    case core.TextAlign.end:
      return flutter.TextAlign.end as flutter.TextAlign;

    case core.TextAlign.center:
      return flutter.TextAlign.center as flutter.TextAlign;

    case core.TextAlign.justify:
      return flutter.TextAlign.justify as flutter.TextAlign;

    default:
      // todo if layoutAlign !== MIN, Text will be wrapped by Align
      // if alignHorizontal is LEFT, don't do anything because that is native
      return undefined;
  }
}
