import { CSSProperties } from "@coli.codes/css";
import {
  EdgeInsets,
  edgeInsetsShorthandMode,
  EdgeInsetsShorthandMode,
} from "@reflect-ui/core";
import { px } from "../dimensions";

type PaddingValue = number | "auto";

export function padding(p: EdgeInsets): CSSProperties {
  switch (edgeInsetsShorthandMode(p)) {
    case EdgeInsetsShorthandMode.empty: {
      return {};
    }
    case EdgeInsetsShorthandMode.all: {
      return {
        padding: _pv(p.top),
      };
    }
    case EdgeInsetsShorthandMode.symetric: {
      return {
        padding: `${_pv(p.top)} ${_pv(p.left)}`,
      };
    }
    case EdgeInsetsShorthandMode.top_horiz_bottom: {
      return {
        padding: `${_pv(p.top)} ${_pv(p.left)} ${_pv(p.bottom)}`,
      };
    }
    case EdgeInsetsShorthandMode.trbl:
    default: {
      return {
        "padding-bottom": _makeifRequired(p?.bottom),
        "padding-top": _makeifRequired(p?.top),
        "padding-left": _makeifRequired(p?.left),
        "padding-right": _makeifRequired(p?.right),
      };
    }
  }
}

/**
 * Margin Value - mv
 * @param pv
 * @returns
 */
function _pv(pv: PaddingValue) {
  if (pv === undefined) {
    return;
  }
  if (pv === "auto") {
    return "auto";
  }
  return px(pv);
}

function _makeifRequired(val: number): string | undefined {
  if (val && val > 0) {
    return px(val);
  }
}
