import { LetterSpacing } from "@design-sdk/figma-types";
import { rd } from "../_utils";

export function letterSpacing(origin: number, target: LetterSpacing) {
  if (target.unit === "PIXELS") {
    return rd(target.value / origin);
  }

  if (target.unit === "PERCENT") {
    return rd(origin * (target.value / 100));
  }
}
