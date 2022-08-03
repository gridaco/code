import { MainAxisAlignment, Snippet } from "@flutter-builder/flutter";
import { MainAxisAlignment as ReflectMainAxisAlignment } from "@reflect-ui/core";
import { do_explicitly_specify, FlutterPropConversionConfig } from "../_";

export function mainAxisAlignment(
  mainAxisAlignemt: ReflectMainAxisAlignment,
  config?: FlutterPropConversionConfig
): MainAxisAlignment {
  switch (mainAxisAlignemt) {
    case ReflectMainAxisAlignment.start:
      // MainAxisAlignment.start is default value for col / row / flex
      return do_explicitly_specify(config, MainAxisAlignment.start as Snippet);
    case ReflectMainAxisAlignment.center:
      return MainAxisAlignment.center as Snippet;
    case ReflectMainAxisAlignment.end:
      return MainAxisAlignment.end as Snippet;
    case ReflectMainAxisAlignment.spaceBetween:
      return MainAxisAlignment.spaceBetween as Snippet;
    case ReflectMainAxisAlignment.spaceAround:
      return MainAxisAlignment.spaceAround as Snippet;
    case ReflectMainAxisAlignment.spaceEvenly:
      return MainAxisAlignment.spaceEvenly as Snippet;
    default:
      throw new Error(`Unsupported MainAxisAlignment: ${mainAxisAlignemt}`);
  }
}
