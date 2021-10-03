import { VerticalDirection } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import { FlutterPropConversionConfig, do_explicitly_specify } from "../_";

export function verticalDirection(
  vd: VerticalDirection,
  config?: FlutterPropConversionConfig
): flutter.VerticalDirection {
  switch (vd) {
    case VerticalDirection.up:
      return flutter.VerticalDirection.up as flutter.VerticalDirection;
    case VerticalDirection.down:
      // VerticalDirection.down is default value
      return do_explicitly_specify(
        config,
        flutter.VerticalDirection.down as flutter.VerticalDirection
      );
  }
  throw new Error(`unknown vertical direction ${vd}`);
}
