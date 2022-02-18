import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";

export function compose_wrapped_with_blurred(
  widget: core.Blurred,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  const isBlurVisibile = widget.blur.visible;
  if (isBlurVisibile) {
    if (widget.blur.type === "LAYER_BLUR") {
      child.extendStyle({
        filter: css.blur(widget.blur.radius),
      });
    } else if (widget.blur.type === "BACKGROUND_BLUR") {
      child.extendStyle({
        "backdrop-filter": css.blur(widget.blur.radius),
      });
    }
  }
  return child;
}
