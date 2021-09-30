import { double } from "@flutter-builder/flutter";
import { roundNumber } from "@reflect-ui/uiutils";

export function roundDouble(double: double): double {
  if (typeof double === "number") {
    return roundNumber(double);
  } else {
    return double;
  }
}
