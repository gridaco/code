/**
 * FIXME: To be merged with multiple in the future
 */
import { Dimension } from "@reflect-ui/core";
import { rd } from "../_utils";

export function multipleToDimension(origin: number, target: Dimension) {
  if (target.unit === "PIXELS") {
    return rd(target.value / origin);
  }

  if (target.unit === "PERCENT") {
    return rd(origin * (target.value / 100));
  }
  return 0;
}
