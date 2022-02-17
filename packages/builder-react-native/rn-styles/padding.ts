import type { EdgeInsets } from "@reflect-ui/core";
import {
  edgeInsetsShorthandMode,
  EdgeInsetsShorthandMode,
} from "@reflect-ui/core";
import type { ViewStyle } from "react-native";

export function padding(p: EdgeInsets): ViewStyle {
  switch (edgeInsetsShorthandMode(p)) {
    case EdgeInsetsShorthandMode.empty: {
      return {};
    }
    case EdgeInsetsShorthandMode.all: {
      return {
        padding: p.top,
      };
    }
    case EdgeInsetsShorthandMode.symetric: {
      return {
        paddingHorizontal: p.left,
        paddingVertical: p.top,
      };
    }
    case EdgeInsetsShorthandMode.trbl:
    case EdgeInsetsShorthandMode.top_horiz_bottom:
    default: {
      return {
        paddingBottom: p.bottom,
        paddingLeft: p.left,
        paddingRight: p.right,
        paddingTop: p.top,
      };
    }
  }
}
