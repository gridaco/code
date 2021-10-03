import { Axis, DimensionLength } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function length(d: DimensionLength, a?: Axis) {
  if (d === undefined) {
    return;
  }

  if (typeof d === "string") {
    if (d === "match-screen-size") {
      switch (a) {
        case Axis.horizontal:
          return flutter.MediaQuery.of().size.width;
        case Axis.vertical:
          return flutter.MediaQuery.of().size.height;
      }
      throw new Error("Invalid axis");
    }

    if (d.endsWith("px")) {
      return parseFloat(d) as flutter.double;
    }

    if (d.endsWith("vw")) {
      throw "not supported";
      //   return vw(parseFloat(d));
    }

    if (d.endsWith("vh")) {
      throw "not supported";
      //   return vh(parseFloat(d));
    }

    if (d.endsWith("%")) {
      throw "% not supported";
      // return percent(d as `${number}%`);
    }

    // this case, the d value is already processed by other css builders.
    else {
      return d;
    }
  } else if (typeof d === "number") {
    return d;
  }

  if (d.type == "calc") {
    throw "calc not supported";
    // return calc(d.operations, a);
  }

  if (d.type == "op") {
    //@ts-ignore
    return operation(d, a);
  }

  throw `no matching length type found. "${JSON.stringify(d)}" was givven`;
}
