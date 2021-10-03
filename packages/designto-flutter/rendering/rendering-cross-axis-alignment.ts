import { CrossAxisAlignment } from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core/lib";
import { do_explicitly_specify, FlutterPropConversionConfig } from "../_";
/**
 * returns CrossAxisAlignment by counterAxisAlignItems
 * @param crossAxisAlignItems
 */
export function crossAxisAlignment(
  crossAxisAlignItems: core.CrossAxisAlignment,
  config?: FlutterPropConversionConfig
): CrossAxisAlignment {
  switch (crossAxisAlignItems) {
    case core.CrossAxisAlignment.start:
      return CrossAxisAlignment.start;
    case core.CrossAxisAlignment.end:
      return CrossAxisAlignment.end;
    case core.CrossAxisAlignment.stretch:
      return CrossAxisAlignment.stretch;
    case core.CrossAxisAlignment.center:
      // CrossAxisAlignment.center is default value
      return do_explicitly_specify(config, CrossAxisAlignment.center);
    default:
      return undefined;
  }
}
