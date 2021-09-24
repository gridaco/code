import { Axis, DimensionLength } from "@reflect-ui/core";
import { length } from "../length";

/**
 * @param h
 * @returns
 */
export function minHeight(h: DimensionLength) {
  return length(h, Axis.vertical);
}
