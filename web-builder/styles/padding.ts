import { CSSProperties, px } from "@coli.codes/css";
import { EdgeInsets } from "@reflect-ui/core";

export function padding(padding: EdgeInsets): CSSProperties {
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
