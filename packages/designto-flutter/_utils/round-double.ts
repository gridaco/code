import { double } from "@flutter-builder/flutter";
import { roundNumber } from "@reflect-ui/uiutils";

/**
 * round double
 * @param double
 * @returns
 */
export function rd(double: double): double {
  if (typeof double === "number") {
    return roundNumber(double);
  } else {
    return double;
  }
}
