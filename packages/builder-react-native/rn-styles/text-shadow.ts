import type { TextShadow } from "@reflect-ui/core";
import type { TextStyle } from "react-native";
import * as css from "@web-builder/styles";

export function textShadow(s: TextShadow): TextStyle {
  return {
    textShadowColor: css.color(s.color),
    textShadowOffset: {
      width: s.offset.dx,
      height: s.offset.dy,
    },
    textShadowRadius: s.blurRadius,
  };
}
