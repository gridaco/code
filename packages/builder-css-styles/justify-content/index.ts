import { MainAxisAlignment } from "@reflect-ui/core";
import { CSSProperties, CSSProperty } from "@coli.codes/css";

export function justifyContent(
  mainAxisAlignment: MainAxisAlignment
): CSSProperties {
  return {
    "justify-content": mainAxisAlignmentToJustifyContent(mainAxisAlignment),
  };
}

export function mainAxisAlignmentToJustifyContent(
  mainAxisAlignment: MainAxisAlignment
): CSSProperty.JustifyContent {
  switch (mainAxisAlignment) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "space-between":
      return "space-between";
    case "space-around":
      return "space-around";
    case "space-evenly":
      return "space-evenly";
    default:
      return;
  }
}
