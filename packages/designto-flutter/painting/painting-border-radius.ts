import * as flutter from "@flutter-builder/flutter";
import { roundNumber } from "@reflect-ui/uiutils";
import * as dartui from "../dart-ui";
import { BorderRadius, BorderRadiusManifest } from "@reflect-ui/core";

export function borderRadiusRequired(br: BorderRadius) {
  if (
    br === undefined ||
    br.all === 0 ||
    (br.bl === 0 && br.br === 0 && br.tl === 0 && br.tr === 0)
  ) {
    return false;
  }
  return true;
}

export function borderRadius(br: BorderRadius): flutter.BorderRadiusGeometry {
  if (!borderRadiusRequired(br)) {
    return undefined;
  }

  return br.all !== undefined
    ? typeof br.all == "number"
      ? flutter.BorderRadius.circular(roundNumber(br.all))
      : undefined
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
