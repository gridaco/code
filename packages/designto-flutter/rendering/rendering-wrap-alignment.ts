import { WrapAlignment } from "@flutter-builder/flutter";
import { WrapAlignment as ReflectWrapAlignment } from "@reflect-ui/core";
import { do_explicitly_specify, FlutterPropConversionConfig } from "../_";

export function wrapAlignment(
  wrapAlignment: ReflectWrapAlignment,
  config?: FlutterPropConversionConfig
): WrapAlignment {
  switch (wrapAlignment) {
    case ReflectWrapAlignment.start:
      // WrapAlignment.start is default value for Wrap
      return do_explicitly_specify(config, WrapAlignment.start);
    case ReflectWrapAlignment.start:
      return WrapAlignment.center;
    case ReflectWrapAlignment.center:
      return WrapAlignment.end;
    case ReflectWrapAlignment.spaceBetween:
      return WrapAlignment.spaceBetween;
    case ReflectWrapAlignment.spaceAround:
      return WrapAlignment.spaceAround;
    case ReflectWrapAlignment.spaceEvenly:
      return WrapAlignment.spaceEvenly;
    default:
      throw new Error(`Unknown wrapAlignment: ${wrapAlignment}`);
  }
}
