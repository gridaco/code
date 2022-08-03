import { Border, BorderSide } from "@reflect-ui/core";
import { CSSProperties, CSSProperty } from "@coli.codes/css";
import { color } from "../color";
import { px } from "../dimensions";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/border
 * @param border;
 * @returns
 */
export function border(border: Border | undefined): CSSProperties {
  if (!border) {
    return;
  }
  const borderobj = {
    "border-left": border.left && borderSide(border.left),
    "border-top": border.top && borderSide(border.top),
    "border-bottom": border.bottom && borderSide(border.bottom),
    "border-right": border.right && borderSide(border.right),
  };

  if (
    borderobj["border-left"] === borderobj["border-top"] &&
    borderobj["border-top"] === borderobj["border-bottom"] &&
    borderobj["border-bottom"] === borderobj["border-right"]
  ) {
    // if all border side value is same, then use single `border:` syntax
    return {
      border: borderobj["border-left"],
    };
  }
  return borderobj;
}

export function borderSide(borderSide: BorderSide): CSSProperty.Border {
  if (borderSide.style === "none") {
    return "none";
  }

  return `${borderSide.style ?? "solid"} ${px(borderSide.width)} ${color(
    borderSide.color
  )}`;
}
