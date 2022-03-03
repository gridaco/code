import * as flutter from "@flutter-builder/flutter";
import { roundNumber } from "@reflect-ui/uiutils";
import * as dartui from "../dart-ui";
import { BorderRadius, BorderRadiusManifest } from "@reflect-ui/core";

export function borderRadius(br: BorderRadius): flutter.BorderRadiusGeometry {
  if (br === undefined || br.all === 0) {
    return undefined;
  }

  return br.all !== undefined
    ? flutter.BorderRadius.circular(roundNumber(br.all as number))
    : _partialBorderRadius(br);
}

function _partialBorderRadius(cornerRadius: BorderRadiusManifest) {
  const _oneofRadiusIsHasValue = [
    cornerRadius.tl,
    cornerRadius.tr,
    cornerRadius.bl,
    cornerRadius.br,
  ].some((i) => i !== undefined);

  if (_oneofRadiusIsHasValue) {
    return flutter.BorderRadius.only({
      topLeft: dartui.radius(cornerRadius.tl),
      topRight: dartui.radius(cornerRadius.tr),
      bottomLeft: dartui.radius(cornerRadius.bl),
      bottomRight: dartui.radius(cornerRadius.br),
    });
  } else {
    // if none of each corner radius contains value (if every value is empty) do not return a value.
    return;
  }
}
