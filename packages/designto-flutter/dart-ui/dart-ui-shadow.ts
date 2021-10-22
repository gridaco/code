import * as flutter from "@flutter-builder/flutter";
import * as dartui from ".";
import { roundNumber } from "@reflect-ui/uiutils";
import { TextShadowManifest } from "@reflect-ui/core";

export function shadow(
  shadows: ReadonlyArray<TextShadowManifest>
): Array<flutter.Shadow> {
  // if no shadow filtered available, return undefined
  if (shadows.length == 0) {
    return undefined;
  }

  const _shadows = shadows.map((d: TextShadowManifest) => {
    return new flutter.Shadow({
      color: dartui.color(d.color),
      blurRadius: requiredNumber(d.blurRadius),
      spreadRadius: undefined,
      offset: dartui.offset(d.offset),
    });
  });

  // return undefined if array is empty, since it's not needed.
  return _shadows.length > 0 ? _shadows : undefined;
}

function requiredNumber(number: number): number {
  const rounded = roundNumber(number);
  if (rounded == 0) {
    return undefined;
  }
  return rounded;
}
