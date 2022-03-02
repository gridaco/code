import { TextDecoration, TextDecorationStyle } from "@reflect-ui/core";
import type { TextStyle } from "react-native";

const _decoration_map = {
  [TextDecoration.linethrough]: "line-through",
  [TextDecoration.none]: "none",
  [TextDecoration.overline]: undefined,
  [TextDecoration.underline]: "underline",
};

const _decoration_style_map = {
  [TextDecorationStyle.dashed]: "dashed",
  [TextDecorationStyle.dotted]: "dotted",
  [TextDecorationStyle.double]: "double",
  [TextDecorationStyle.solid]: "solid",
  [TextDecorationStyle.wavy]: undefined,
};

export function textDecoration(
  de: TextDecoration,
  s: TextDecorationStyle
): TextStyle {
  return {
    textDecorationLine: _decoration_map[de],
    textDecorationStyle: _decoration_style_map[s],
    // textDecorationColor: ???,
  };
}
