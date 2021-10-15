import * as flutter from "@flutter-builder/flutter";
import { DimensionLength } from "@reflect-ui/core";

export function multiple(origin: number, target: DimensionLength) {
  if (typeof target === "string") {
    const regx = /\d+/;
    const targetToNum = parseInt(target.match(regx)[0]);

    if (target.endsWith("%")) {
      return origin * (targetToNum / 100);
    }

    if (target.endsWith("px")) {
      return targetToNum / origin;
    }

    return targetToNum;
  }

  if (typeof target === "number") {
    return origin / target;
  }

  // if (target.type == "calc") {
  //   throw "calc not supported";
  //   // return calc(d.operations, a);
  // }
}
