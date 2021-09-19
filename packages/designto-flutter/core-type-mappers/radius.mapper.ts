import * as flutter from "@bridged.xyz/flutter-builder";
import { IRadius } from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";

export function mapRadius(radius: IRadius): flutter.Radius {
  if (typeof radius == "number") {
    return flutter.Radius.circular(roundNumber(radius));
  } else {
    return flutter.Radius.elliptical(
      roundNumber(radius.x),
      roundNumber(radius.y)
    );
  }
}
