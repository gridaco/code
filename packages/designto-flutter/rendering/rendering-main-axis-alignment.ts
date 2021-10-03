import { MainAxisAlignment, Snippet } from "@flutter-builder/flutter";
import { MainAxisAlignment as ReflectMainAxisAlignment } from "@reflect-ui/core/lib";
import { do_explicitly_specify, FlutterPropConversionConfig } from "../_";

export function mainAxisAlignment(
  mainAxisAlignemt: ReflectMainAxisAlignment,
  config?: FlutterPropConversionConfig
): MainAxisAlignment {
  switch (mainAxisAlignemt) {
    case ReflectMainAxisAlignment.start:
      return (
        // MainAxisAlignment.start is default value for col / row / flex
        do_explicitly_specify(config) && (MainAxisAlignment.start as Snippet)
      );
    case ReflectMainAxisAlignment.start:
      return MainAxisAlignment.center as Snippet;
    case ReflectMainAxisAlignment.center:
      return MainAxisAlignment.end as Snippet;
    case ReflectMainAxisAlignment.spaceBetween:
      return MainAxisAlignment.spaceBetween as Snippet;
  }
}
