import * as core from "@reflect-ui/core";
import { Composer } from ".";
import { ImageFiltered } from "@flutter-builder/flutter";
import * as flutter from "@flutter-builder/flutter";
import { rd } from "../_utils";

export function compose_wrapped_with_blurred(
  widget: core.Blurred,
  child_composer: Composer
): flutter.BackdropFilter | ImageFiltered {
  const { child, blur } = widget;

  switch (blur.type) {
    case "BACKGROUND_BLUR": {
      return new flutter.BackdropFilter({
        filter: flutter.ImageFilter.blur({
          sigmaX: rd(blur.radius),
          sigmaY: rd(blur.radius),
        }) as flutter.ImageFilter,
        blendMode: flutter.BlendMode.overlay,
        child: child_composer(child, child_composer),
      });
    }
    case "LAYER_BLUR": {
      return new ImageFiltered({
        imageFilter: flutter.ImageFilter.blur({
          sigmaX: rd(blur.radius),
          sigmaY: rd(blur.radius),
        }) as flutter.ImageFilter,
        child: child_composer(child, child_composer),
      });
    }
  }
}
