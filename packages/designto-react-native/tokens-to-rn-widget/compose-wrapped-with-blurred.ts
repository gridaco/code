import * as core from "@reflect-ui/core";
import { Composer } from ".";
import type { ViewStyle } from "react-native";

/**
 * @deprecated Blur for RN not supported yet.
 *
 * Learn more
 * - https://stackoverflow.com/questions/37131278/how-to-make-the-blur-effect-with-react-native
 *
 * @param widget
 * @param child_composer
 * @returns
 */
export function compose_wrapped_with_blurred(
  widget: core.Blurred,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  const isBlurVisibile = widget.blur.visible;
  if (isBlurVisibile) {
    if (widget.blur.type === "LAYER_BLUR") {
      child.extendStyle<ViewStyle>({
        // FIXME: blur not supported in RN
        // filter: css.blur(widget.blur.radius),
      });
    } else if (widget.blur.type === "BACKGROUND_BLUR") {
      child.extendStyle<ViewStyle>({
        // FIXME: backdrop-filter not supported in RN
        // "backdrop-filter": css.blur(widget.blur.radius),
      });
    }
  }
  return child;
}
