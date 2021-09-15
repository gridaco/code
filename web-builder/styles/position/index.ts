import { CSSProperties } from "@coli.codes/css";
import { px } from "..";

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
