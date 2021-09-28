import { Border, BorderSide } from "@reflect-ui/core";
import { CSSProperties, CSSProperty } from "@coli.codes/css";
import { color } from "../color";
import { px } from "../dimensions";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/border
 * @param border;
 * @returns
 */
export function border(border: Border): CSSProperties {
  if (!border) {
    return;
  }
  return {
    "border-left": border.left && borderSide(border.left),
    "border-top": border.top && borderSide(border.top),
    "border-bottom": border.bottom && borderSide(border.bottom),
    "border-right": border.right && borderSide(border.right),
  };
}

export function borderSide(borderSide: BorderSide): CSSProperty.Border {
  return `solid ${px(borderSide.width)} ${color(borderSide.color)}`;
}
