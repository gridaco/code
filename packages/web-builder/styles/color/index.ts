import { CssNamedColor, ICssRGBA } from "@coli.codes/css/css-color";
import { Color, RGB } from "@reflect-ui/core/lib/color";

type HexColor = string;

type CssColorInputLike = CssNamedColor | HexColor | ICssRGBA;

export function color(input: CssColorInputLike | Color): string {
  if (!input) {
    console.warn(
      'undefined color is passed to "makeCssColorValue". check this.'
    );
    return "#000000; /*ERROR*/";
  }
  if (typeof input == "string") {
    // interpret as hex color or named color
    return input;
  } else if (input instanceof CssNamedColor) {
    return input.name;
  } else if (typeof input == "object") {
    if ("r" in input && "a" in input) {
      const a = validAlphaValue(input.a);
      const rgba = input as ICssRGBA;
      return `rgba(${validColorValue(rgba.r) ?? 0}, ${
        validColorValue(rgba.g) ?? 0
      }, ${validColorValue(rgba.b) ?? 0}, ${a ?? 1})`;
    } else if ("r" in input && "a"! in input) {
      const rgb = input as RGB;
      return `rgb(${validColorValue(rgb.r) ?? 0}, ${
        validColorValue(rgb.g) ?? 0
      }, ${validColorValue(rgb.b) ?? 0})`;
    }
  } else {
    throw `input color "${JSON.stringify(
      input
    )}" cannot be interpreted as valid css color value`;
  }
}

const validColorValue = (f: number) => {
  if (f === undefined) {
    return;
  }
  if (f <= 1) {
    return Math.round(f * 255.0);
  } else {
    return Math.round(f);
  }
};

/**
 * returns rounded alpha value at decimal point 2.
 * @param f
 * @returns
 */
const validAlphaValue = (f: number) => {
  try {
    // from https://stackoverflow.com/a/11832950/5463235
    return Math.round((f + Number.EPSILON) * 100) / 100;
  } catch (_) {
    // returns undefined
    return;
  }
};
