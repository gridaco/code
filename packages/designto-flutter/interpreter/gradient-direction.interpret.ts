import * as flutter from "@bridged.xyz/flutter-builder";
import { array } from "@reflect-ui/uiutils";

type GradientDirection = {
  begin: flutter.AlignmentGeometry;
  end: flutter.AlignmentGeometry;
};

export function interpretGradientDirection(angle: number): GradientDirection {
  switch (
    array.nearestValue(angle, [-180, -135, -90, -45, 0, 45, 90, 135, 180])
  ) {
    case 0:
      return {
        begin: flutter.Alignment.centerLeft,
        end: flutter.Alignment.centerRight,
      };
    case 45:
      return {
        begin: flutter.Alignment.topLeft,
        end: flutter.Alignment.bottomRight,
      };
    case 90:
      return {
        begin: flutter.Alignment.topCenter,
        end: flutter.Alignment.bottomCenter,
      };
    case 135:
      return {
        begin: flutter.Alignment.topRight,
        end: flutter.Alignment.bottomLeft,
      };
    case -45:
      return {
        begin: flutter.Alignment.bottomLeft,
        end: flutter.Alignment.topRight,
      };
    case -90:
      return {
        begin: flutter.Alignment.bottomCenter,
        end: flutter.Alignment.topCenter,
      };
    case -135:
      return {
        begin: flutter.Alignment.bottomRight,
        end: flutter.Alignment.topLeft,
      };
    default:
      // when 180 or -180
      return {
        begin: flutter.Alignment.centerRight,
        end: flutter.Alignment.centerLeft,
      };
  }
}
