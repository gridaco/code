import { Axis, DimensionLength } from "@reflect-ui/core";
import { px, vw, vh } from "../dimensions";

export function length(d: DimensionLength, a: Axis) {
  if (typeof d === "string") {
    if (d === "match-screen-size") {
      switch (a) {
        case Axis.horizontal:
          return vw(100);
        case Axis.vertical:
          return vh(100);
      }
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
  } else {
    return px(d);
  }

  console.error(`no matching length type found. falling back to px.`);
  return px((d as any) as number);
}
