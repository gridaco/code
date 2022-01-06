import { CSSProperties } from "@coli.codes/css";
import { EdgeInsets } from "@reflect-ui/core";
import { px } from "../dimensions";

type MarginValue = number | "auto";

export function margin(m: EdgeInsets): CSSProperties {
  if (!m) {
    return {};
  }
  if (m.top === 0 && m.right === 0 && m.bottom === 0 && m.left === 0) {
    return {};
  }
  if (m.top === m.bottom && m.left === m.right) {
    return {
      margin: `${_mv(m.top)} ${_mv(m.left)}`,
    };
  } else if (m.left === m.right) {
    return {
      margin: `${_mv(m.top)} ${_mv(m.left)} ${_mv(m.bottom)}`,
    };
  }
  return {
    "margin-bottom": _makeifRequired(m?.bottom),
    "margin-top": _makeifRequired(m?.top),
    "margin-left": _makeifRequired(m?.left),
    "margin-right": _makeifRequired(m?.right),
  };
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
