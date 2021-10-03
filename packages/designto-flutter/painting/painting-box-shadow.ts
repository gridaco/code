import * as flutter from "@flutter-builder/flutter";
import * as dartui from "../dart-ui";
import { roundNumber } from "@reflect-ui/uiutils";
import { BoxShadowManifest } from "@reflect-ui/core";

export function boxShadow(
  shadows: ReadonlyArray<BoxShadowManifest>
): Array<flutter.BoxShadow> {
  // if no shadow filtered available, return undefined
  if (shadows.length == 0) {
    return undefined;
  }

  const boxShadows: Array<flutter.BoxShadow> = shadows.map(
    (d: BoxShadowManifest) => {
      return new flutter.BoxShadow({
        color: dartui.color(d.color),
        blurRadius: requiredNumber(d.blurRadius),
        spreadRadius: requiredNumber(d.spreadRadius),
        offset: dartui.offset(d.offset),
      });

      // if (d.type == "INNER_SHADOW") {
      // handling inner shadow
      // https://stackoverflow.com/a/55096682/5463235
      // inner shadow disabled.
      // --------------------------------
      // return new flutter.BoxShadow({
      //   color: makeColorFromRGBO(d.color, d.color.a),
      //   blurRadius: requiredNumber(d.radius),
      //   // multiply -1 * blur for spread
      //   // TODO inspect this logic again.
      //   spreadRadius: requiredNumber((d.spread + d.radius) * -1),
      //   offset: requiredOffset(new flutter.Offset(d.offset.x, d.offset.y)),
      // });
      // }
    }
  );

  // return undefined if array is empty, since it's not needed.
  return boxShadows.length > 0 ? boxShadows : undefined;
}

function requiredNumber(number: number): number {
  const rounded = roundNumber(number);
  if (rounded == 0) {
    return undefined;
  }
  return rounded;
}
