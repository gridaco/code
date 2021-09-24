import { CSSProperties } from "@coli.codes/css";
import { DimensionLength } from "@reflect-ui/core";
import { px } from "../dimensions";
import { length } from "../length";
/**
 * relative position with xy
 * @param x
 * @param y
 * @returns
 */
export function positionXY(x: number, y: number): CSSProperties {
  if (!!x || !!y) {
    return {
      position: "relative",
      top: y && px(y), // if 0, it will be ignored
      left: x && px(x), // if 0, it will be ignored
    };
  }
}

export function positionAbsolute(constraint?: {
  left?: DimensionLength;
  top?: DimensionLength;
  right?: DimensionLength;
  bottom?: DimensionLength;
}): CSSProperties {
  if (constraint) {
    return {
      position: "absolute",
      left: length(constraint.left),
      top: length(constraint.top),
      right: length(constraint.right),
      bottom: length(constraint.bottom),
    };
  }
}
