import { CSSProperties } from "@coli.codes/css";
import { EdgeInsets } from "@reflect-ui/core";
import { px } from "../dimensions";

export function padding(padding: EdgeInsets): CSSProperties {
  if (
    padding.top === 0 &&
    padding.right === 0 &&
    padding.bottom === 0 &&
    padding.left === 0
  ) {
    return {};
  }
  if (padding.top === padding.bottom && padding.left === padding.right) {
    return {
      padding: `${px(padding.top)} ${px(padding.left)}`,
    };
  } else if (padding.left === padding.right) {
    return {
      padding: `${px(padding.top)} ${px(padding.left)} ${px(padding.bottom)}`,
    };
  }
  return {
    "padding-bottom": _makeifRequired(padding?.bottom),
    "padding-top": _makeifRequired(padding?.top),
    "padding-left": _makeifRequired(padding?.left),
    "padding-right": _makeifRequired(padding?.right),
  };
}

function _makeifRequired(val: number): string | undefined {
  if (val && val > 0) {
    return px(val);
  }
}
