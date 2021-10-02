import { EdgeInsets } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function edgeinsets(ei: EdgeInsets): flutter.EdgeInsets {
  if (!ei) {
    return undefined;
  }

  if ("all" in ei) {
    // missing usage of commonPadding();
    return flutter.EdgeInsets.all((ei as any).all);
  }

  // horizontal and vertical, as the default AutoLayout
  if (
    ei.horizontal + ei.vertical !== 0 &&
    ei.top + ei.bottom + ei.left + ei.right === 0
  ) {
    const propHorizontalPadding: number =
      ei.horizontal > 0 ? ei.horizontal : undefined;

    const propVerticalPadding: number =
      ei.vertical > 0 ? ei.vertical : undefined;

    return flutter.EdgeInsets.symmetric({
      horizontal: propHorizontalPadding,
      vertical: propVerticalPadding,
    });
  }

  // all padding to 0 does not require padding.
  if (ei.left === 0 && ei.right === 0 && ei.top === 0 && ei.bottom === 0) {
    return undefined;
  }

  return flutter.EdgeInsets.only({
    left: getOnlyIfNotZero(ei.left || ei.horizontal),
    right: getOnlyIfNotZero(ei.right || ei.horizontal),
    top: getOnlyIfNotZero(ei.top || ei.vertical),
    bottom: getOnlyIfNotZero(ei.bottom || ei.vertical),
  });
}

function getOnlyIfNotZero(value): number {
  if (value === 0) {
    return;
  }
  return value;
}
