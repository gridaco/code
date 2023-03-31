import fonts from "./fonts.json";
import { constructURL } from "./utils";

interface MinimalGoogleFontMeta {
  fallbacks: string[];
  weights: number[];
  styles: string[];
  variants: [number, number][];
}

interface GoogleFontMeta extends MinimalGoogleFontMeta {
  family: string;
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
  const found = fonts[family] as MinimalGoogleFontMeta;
  if (found) {
    return {
      ...found,
      family,
      service: "fonts.google.com",
      urls: {
        "*":
          constructURL({
            families: {
              [family]: {
                wght: found.weights,
                // TODO: add styles and variants support
              },
            },
          }) || "",
      },
    };
  }
  return false;
}
