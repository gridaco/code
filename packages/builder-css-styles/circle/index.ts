import { DimensionLength } from "@reflect-ui/core";
import { length } from "../length";

/**
 * [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/circle())
 *
 * ```css
 * shape-outside: circle(50%);
 * clip-path: circle(6rem at 12rem 8rem);
 * ```
 */
export function circle(radius: DimensionLength, position?: DimensionLength) {
  if (position) {
    return `circle(${length(radius)} at ${length(position)})`;
  }
  return `circle(${length(radius)})`;
}
