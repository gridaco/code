import { FontWeight } from "@reflect-ui/core";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 */
export type CSSFontWeight =
  | "inherit"
  | "initial"
  | "unset"
  //
  | "lighter"
  | "bolder"
  //
  | CSSNumericFontWeight;

type CSSNumericFontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export function convertToCssFontWeight(fontWeight: FontWeight): CSSFontWeight {
  if (fontWeight === undefined) {
    return "initial";
  }
  if (fontWeight === null) {
    return "unset";
  }

  switch (fontWeight) {
    case FontWeight.normal:
      return "normal";
    case FontWeight.bold:
      return "bold";
    case FontWeight.lighter:
      return "lighter";
    case FontWeight.bolder:
      return "bolder";
    case FontWeight.w100:
    case FontWeight.w200:
    case FontWeight.w300:
    case FontWeight.w400:
    case FontWeight.w500:
    case FontWeight.w600:
    case FontWeight.w700:
    case FontWeight.w800:
    case FontWeight.w900:
      return numericFontWeight(fontWeight);
    default:
      return "inherit";
  }
}

export function numericFontWeight(
  fontWeight: FontWeight
): CSSNumericFontWeight {
  switch (fontWeight) {
    case FontWeight.normal:
      return "normal";
    case FontWeight.bold:
      return "bold";
    case FontWeight.lighter:
      return "300";
    case FontWeight.bolder:
      return "900";
    case FontWeight.w100:
      return "100";
    case FontWeight.w200:
      return "200";
    case FontWeight.w300:
      return "300";
    case FontWeight.w400:
      return "400";
    case FontWeight.w500:
      return "500";
    case FontWeight.w600:
      return "600";
    case FontWeight.w700:
      return "700";
    case FontWeight.w800:
      return "800";
    case FontWeight.w900:
      return "900";
    default:
      return undefined;
  }
}
