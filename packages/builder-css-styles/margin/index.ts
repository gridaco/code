import { CSSProperties } from "@coli.codes/css";
import {
  EdgeInsets,
  edgeInsetsShorthandMode,
  EdgeInsetsShorthandMode,
} from "@reflect-ui/core";
import { px } from "../dimensions";

type MarginValue = number | "auto";

export function margin(m: EdgeInsets): CSSProperties {
  switch (edgeInsetsShorthandMode(m)) {
    case EdgeInsetsShorthandMode.empty: {
      return {};
    }
    case EdgeInsetsShorthandMode.all: {
      return {
        margin: _mv(m.top),
      };
    }
    case EdgeInsetsShorthandMode.symetric: {
      return {
        margin: `${_mv(m.top)} ${_mv(m.left)}`,
      };
    }
    case EdgeInsetsShorthandMode.top_horiz_bottom: {
      return {
        margin: `${_mv(m.top)} ${_mv(m.left)} ${_mv(m.bottom)}`,
      };
    }
    case EdgeInsetsShorthandMode.trbl:
    default: {
      return {
        "margin-bottom": _makeifRequired(m?.bottom),
        "margin-top": _makeifRequired(m?.top),
        "margin-left": _makeifRequired(m?.left),
        "margin-right": _makeifRequired(m?.right),
      };
    }
  }
}

/**
 * Margin Value - mv
 * @param mv
 * @returns
 */
function _mv(mv: MarginValue) {
  if (mv === undefined) {
    return;
  }
  if (mv === "auto") {
    return "auto";
  }
  return px(mv);
}

function _makeifRequired(val: MarginValue): string | undefined {
  if (val === undefined) {
    return;
  }
  if (val === "auto") {
    return "auto";
  }
  if (val && val > 0) {
    return px(val);
  }
}
