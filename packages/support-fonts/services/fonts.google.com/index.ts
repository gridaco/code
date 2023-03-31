import fonts from "./fonts.json";
import { constructURL } from "./utils";

interface GoogleFontMeta {
  family: string;
  fallbacks: string[];
  weights: number[];
  styles: string[];
  variants: [number, number][];
  service: "fonts.google.com";
  urls: {
    [request: string]: string;
  };
}

/**
 * Get the google font with the given family name
 * If the font is not found, it will return undefined
 * @param family
 * @returns
 */
export function googlefont(family: string): GoogleFontMeta | false {
  const found = fonts[family];
  if (found) {
    return {
      ...found,
      family,
      service: "fonts.google.com",
      urls: {
        "*": {}, // TODO:
        //   // constructURL({
        //   // families: [family],
        //   // , found.styles, found.weights
        // }),
      },
    };
  }
  return false;
}
