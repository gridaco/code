import { Axis, DimensionLength } from "@reflect-ui/core";

export function lineHeight(d: DimensionLength | string, a?: Axis) {
  if (!d) {
    return "normal";
  }
  return;
  // throw `no matching length type found. "${JSON.stringify(d)}" was givven`;
  // return px((d as any) as number);
}
