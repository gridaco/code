import * as flutter from "@bridged.xyz/flutter-builder";
import { IRadius } from "@reflect-ui/core/lib/ui/radius/radius.manifest";

export function interpretRadius(radius: IRadius): flutter.Radius {
  if (typeof radius == "number") {
    return flutter.Radius.circular(radius as number);
  } else {
    return flutter.Radius.elliptical(radius.x, radius.y);
  }
}
