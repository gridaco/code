import type { Background } from "@reflect-ui/core";
import type { ViewStyle } from "react-native";
import * as css from "@web-builder/styles";

export function background(bg: Background): ViewStyle {
  if (!bg) {
    return {};
  }

  bg = Array.isArray(bg) ? bg[0] : bg;
  switch (bg.type) {
    case "solid-color": {
      return {
        backgroundColor: css.color(bg),
      };
    }
    case "gradient":
    case "image":
    default: {
      // gradient not supported by default on react-native
      // for graphics, we need to use ImageBackground element. this can't be done by StyleSheet modification.
      return {};
    }
  }
}
