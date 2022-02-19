import type { Border, BorderRadius } from "@reflect-ui/core";
import type { ViewStyle } from "react-native";
import * as css from "@web-builder/styles";
export function border(p: Border, rad: BorderRadius): ViewStyle {
  if (!p) return {};

  let o: ViewStyle = <ViewStyle>{
    borderBottomColor: p?.bottom?.color,
    borderBottomEndRadius: rad?.br,
    borderBottomLeftRadius: rad?.bl,
    borderBottomRightRadius: rad?.br,
    borderBottomStartRadius: rad?.bl,
    borderBottomWidth: p?.bottom?.width,
    // borderColor,
    // borderEndColor,
    borderLeftColor: p?.left?.color,
    borderLeftWidth: p?.left?.width,
    // borderRadius,
    borderRightColor: p?.right?.color,
    borderRightWidth: p?.right?.width,
    // borderStartColor,
    // borderStyle, // TODO: add border style support
    borderTopColor: p?.top?.color,
    borderTopEndRadius: rad?.tr,
    borderTopLeftRadius: rad?.tl,
    borderTopRightRadius: rad?.tr,
    borderTopStartRadius: rad?.tl,
    borderTopWidth: p?.top?.width,
    // borderWidth,
  };

  // if colors are all same
  if (equals(p.top?.color, p.right?.color, p.bottom?.color, p.left?.color)) {
    o = {
      ...o,
      borderColor: css.color(p.top.color),
      borderBottomColor: undefined,
      borderLeftColor: undefined,
      borderRightColor: undefined,
      borderTopColor: undefined,
    };
  }

  return o;
}

const equals = (...v): boolean => {
  for (let i = 1; i < v.length; i++) {
    if (v[i] !== v[0]) {
      return false;
    }
  }
  return true;
};
