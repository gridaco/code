import { Radius } from "@bridged.xyz/flutter-builder";
import { IRadius } from "@reflect-ui/core/lib/ui/radius/radius.manifest";

export function interpretRadius(radius: IRadius): Radius {
  if (typeof radius == "number") {
    return Radius.circular(radius as number);
  } else {
    // TODO
    // console.warn(
    //   "elliptical radius is not supported. returning undefined instead"
    // );
    return;
  }
}
