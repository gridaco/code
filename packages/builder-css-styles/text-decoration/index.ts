import { CSSProperty } from "@coli.codes/css";
import { TextDecoration } from "@reflect-ui/core";

export function textDecoration(
  textdecoration: TextDecoration,
  options?: {
    explicit_none: boolean;
  }
): CSSProperty.TextDecoration {
  switch (textdecoration) {
    case "underline":
      return "underline";
    case "linethrough":
      return "line-through";
    case "overline":
      return "overline";
    case "none":
      if (options?.explicit_none) {
        return "none";
      }
      return undefined;
  }
}
