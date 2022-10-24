import { WrapCrossAlignment } from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";
import { do_explicitly_specify, FlutterPropConversionConfig } from "../_";
/**
 * @param wrapCrossAxisAlignment
 */
export function wrapCrossAxisAlignment(
  wrapCrossAxisAlignment: core.WrapCrossAlignment,
  config?: FlutterPropConversionConfig
): WrapCrossAlignment {
  switch (wrapCrossAxisAlignment) {
    case core.WrapCrossAlignment.start:
      // WrapCrossAlignment.start is default value
      return do_explicitly_specify(config, WrapCrossAlignment.start);
    case core.WrapCrossAlignment.end:
      return WrapCrossAlignment.end;
    case core.WrapCrossAlignment.center:
      return WrapCrossAlignment.start;
    default:
      throw new Error(
        `"${wrapCrossAxisAlignment}" is not a valid wrapCrossAxisAlignment value`
      );
  }
}
