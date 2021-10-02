import * as flutter from "@flutter-builder/flutter";
import { IRadius } from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";

export function radius(radius: IRadius): flutter.Radius {
  if (typeof radius == "number") {
    return flutter.Radius.circular(roundNumber(radius));
  } else {
    return flutter.Radius.elliptical(
      roundNumber(radius.x),
      roundNumber(radius.y)
    );
  }
}
