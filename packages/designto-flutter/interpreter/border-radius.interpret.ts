import {
  BorderRadiusGeometry,
  BorderRadius,
} from "@bridged.xyz/flutter-builder";
import { interpretRadius } from "./radius.interpret";
import { BorderRadiusManifest, isCircularRadius } from "@reflect-ui/core";

export function interpretBorderRadius(
  borderRadius: BorderRadiusManifest
): BorderRadiusGeometry {
  // figma.mixed means lrtb values are mixed.
  if (borderRadius.all === undefined) {
    return BorderRadius.only({
      topLeft:
        borderRadius.tl == 0 ? undefined : interpretRadius(borderRadius.tl),
      topRight:
        borderRadius == 0 ? undefined : interpretRadius(borderRadius.tr),
      bottomLeft:
        borderRadius.bl == 0 ? undefined : interpretRadius(borderRadius.bl),
      bottomRight:
        borderRadius.br == 0 ? undefined : interpretRadius(borderRadius.br),
    });
  } else {
    if (borderRadius.all != 0) {
      if (isCircularRadius(borderRadius.all)) {
        return BorderRadius.circular(borderRadius.all);
      } else {
        // TODO: handle elliptical radii
      }
    }
  }
}
