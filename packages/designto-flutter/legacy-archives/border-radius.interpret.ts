import { BorderRadiusGeometry, BorderRadius } from "@flutter-builder/flutter";
import { mapRadius } from "../core-type-mappers";
import { BorderRadiusManifest, isCircularRadius } from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";

export function interpretBorderRadius(
  borderRadius: BorderRadiusManifest
): BorderRadiusGeometry {
  // figma.mixed means lrtb values are mixed.
  if (borderRadius.all === undefined) {
    return BorderRadius.only({
      topLeft: borderRadius.tl == 0 ? undefined : mapRadius(borderRadius.tl),
      topRight: borderRadius == 0 ? undefined : mapRadius(borderRadius.tr),
      bottomLeft: borderRadius.bl == 0 ? undefined : mapRadius(borderRadius.bl),
      bottomRight:
        borderRadius.br == 0 ? undefined : mapRadius(borderRadius.br),
    });
  } else {
    if (borderRadius.all != 0) {
      if (isCircularRadius(borderRadius.all)) {
        return BorderRadius.circular(roundNumber(borderRadius.all));
      } else {
        // TODO: handle elliptical radii
      }
    }
  }
}
