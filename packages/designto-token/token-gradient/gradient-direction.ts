import { Alignment } from "@reflect-ui/core";
import { array } from "@reflect-ui/uiutils";

type GradientDirection = {
  begin: Alignment;
  end: Alignment;
};

export function tokenize_gradient_direction_from_angle(
  angle: number
): GradientDirection {
  switch (
    array.nearestValue(angle, [-180, -135, -90, -45, 0, 45, 90, 135, 180])
  ) {
    case 0:
      return {
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
      };
    case 45:
      return {
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      };
    case 90:
      return {
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      };
    case 135:
      return {
        begin: Alignment.topRight,
        end: Alignment.bottomLeft,
      };
    case -45:
      return {
        begin: Alignment.bottomLeft,
        end: Alignment.topRight,
      };
    case -90:
      return {
        begin: Alignment.bottomCenter,
        end: Alignment.topCenter,
      };
    case -135:
      return {
        begin: Alignment.bottomRight,
        end: Alignment.topLeft,
      };
    default:
      // when 180 or -180
      return {
        begin: Alignment.centerRight,
        end: Alignment.centerLeft,
      };
  }
}
