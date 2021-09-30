import * as flutter from "@flutter-builder/flutter";
import {
  ReflectEllipseNode,
  IReflectRectangleCornerMixin,
} from "@design-sdk/core";
import { mapRadius } from "../core-type-mappers";
import * as core from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";

export function makeBorderRadius(
  node: IReflectRectangleCornerMixin
): flutter.BorderRadiusGeometry {
  if (node instanceof ReflectEllipseNode) return undefined;
  if (node.cornerRadius === undefined || node.cornerRadius.all === 0) {
    return undefined;
  }

  return node.cornerRadius.all !== undefined
    ? flutter.BorderRadius.circular(
        roundNumber(node.cornerRadius.all as number)
      )
    : _makePartialBorderRadius(node.cornerRadius);
}

function _makePartialBorderRadius(cornerRadius: core.BorderRadiusManifest) {
  const _oneofRadiusIsHasValue = [
    cornerRadius.tl,
    cornerRadius.tr,
    cornerRadius.bl,
    cornerRadius.br,
  ].some((i) => i !== undefined);

  if (_oneofRadiusIsHasValue) {
    return flutter.BorderRadius.only({
      topLeft: mapRadius(cornerRadius.tl),
      topRight: mapRadius(cornerRadius.tr),
      bottomLeft: mapRadius(cornerRadius.bl),
      bottomRight: mapRadius(cornerRadius.br),
    });
  } else {
    // if none of each corner radius contains value (if every value is empty) do not return a value.
    return;
  }
}
