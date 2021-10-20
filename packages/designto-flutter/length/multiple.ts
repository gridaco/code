import { DimensionLength } from "@reflect-ui/core";

export function multiple(origin: number, target: DimensionLength) {
  if (typeof target === "string") {
   
    if (target.endsWith("%")) {
      return origin * (parseFloat(target) / 100);
    }

    if (target.endsWith("px")) {
      return (parseFloat(target) / origin);
    }

    return (parseFloat(target));
  }

  if (typeof target === "number") {
    return target / origin;
  }

  // if (target.type == "calc") {
  //   throw "calc not supported";
  //   // return calc(d.operations, a);
  // }
}
