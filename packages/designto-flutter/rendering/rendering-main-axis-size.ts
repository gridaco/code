import { MainAxisSize } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import { FlutterPropConversionConfig, do_explicitly_specify } from "../_";

export function mainAxisSize(
  m: MainAxisSize,
  config?: FlutterPropConversionConfig
): flutter.MainAxisSize {
  switch (m) {
    case MainAxisSize.max:
      // MainAxisSize.max is default value for col / row / flex
      return do_explicitly_specify(config, flutter.MainAxisSize.max);
    case MainAxisSize.min:
      return flutter.MainAxisSize.min;
  }
}
