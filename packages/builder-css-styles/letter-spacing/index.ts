import * as css from "@web-builder/styles";
import { LetterSpacing } from "@design-sdk/figma-types";
import { percent } from "../percent";

export function letterSpacing(origin: LetterSpacing): string {
  if (origin.unit === "PIXELS") {
    return css.px(origin.value);
  } else if (origin.unit === "PERCENT") {
    return percent(origin.value as number);
  }
}
