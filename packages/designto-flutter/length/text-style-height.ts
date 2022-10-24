import type { DimensionLength } from "@reflect-ui/core";

/**
 * flutter text style's height property accepts a multiply factor. e.g. if font size is 16 and height is 18, the height for flutter will be 18 / 16 = 1.125
 * While the height property from reflect-core can be both % value and px value, we'll handle this by case.
 */
export function textstyle_height(fontsize: number, height: DimensionLength) {
  if (typeof height === "number") {
    return height / fontsize;
  }

  if (typeof height === "string") {
    if (height.endsWith("%")) {
      // percentage value to 0~1 factor.
      return parseFloat(height) / 100;
    }

    if (height.endsWith("px")) {
      return textstyle_height(fontsize, parseFloat(height));
    }
  }
}
