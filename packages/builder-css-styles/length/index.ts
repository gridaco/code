import { Axis, DimensionLength } from "@reflect-ui/core";
import { calc, operation } from "../calc";
import { px, vw, vh } from "../dimensions";
import { percent } from "../percent";

export function length(d: DimensionLength | string, a?: Axis) {
  if (d === undefined) {
    return;
  }
  if (typeof d === "number") {
    if (d) {
      return px(d);
    }
    return;
  }

  if (typeof d === "string") {
    if (d === "match-screen-size") {
      switch (a) {
        case Axis.horizontal:
          return vw(100);
        case Axis.vertical:
          return vh(100);
      }
      throw new Error("Invalid axis");
    }
    if (!parseFloat(d)) {
      return;
    }

    if (d.endsWith("px")) {
      return px(parseFloat(d));
    }

    if (d.endsWith("vw")) {
      return vw(parseFloat(d));
    }

    if (d.endsWith("vh")) {
      return vh(parseFloat(d));
    }

    if (d.endsWith("%")) {
      return percent(d as `${number}%`);
    }

    // this case, the d value is already processed by other css builders.
    else {
      return d;
    }
  }

  if (d.type == "calc") {
    return calc(d.operations, a);
  }

  if (d.type == "op") {
    //@ts-ignore
    return operation(d, a);
  }

  throw `no matching length type found. "${JSON.stringify(d)}" was givven`;
  return px((d as any) as number);
}
