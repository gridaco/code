import { MainAxisSize } from "@flutter-builder/flutter";
import { FigmaLayoutGrow } from "@design-sdk/figma-types";

export function mainAxisSize(layoutGrow: FigmaLayoutGrow): MainAxisSize {
  if (layoutGrow === 0) {
    return MainAxisSize.min;
  } else {
    return MainAxisSize.max;
  }
}