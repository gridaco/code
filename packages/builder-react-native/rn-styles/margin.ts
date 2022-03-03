import type { EdgeInsets } from "@reflect-ui/core";
import {
  edgeInsetsShorthandMode,
  EdgeInsetsShorthandMode,
} from "@reflect-ui/core";
import type { ViewStyle } from "react-native";

export function margin(p: EdgeInsets): ViewStyle {
  switch (edgeInsetsShorthandMode(p)) {
    case EdgeInsetsShorthandMode.empty: {
      return {};
    }
    case EdgeInsetsShorthandMode.all: {
      return {
        margin: p.top,
      };
    }
    case EdgeInsetsShorthandMode.symetric: {
      return {
        marginHorizontal: p.left,
        marginVertical: p.top,
      };
    }
    case EdgeInsetsShorthandMode.trbl:
    case EdgeInsetsShorthandMode.top_horiz_bottom:
    default: {
      return {
        marginBottom: p.bottom,
        marginLeft: p.left,
        marginRight: p.right,
        marginTop: p.top,
      };
    }
  }
}
