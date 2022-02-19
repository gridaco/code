import * as core from "@reflect-ui/core";
import { Composer } from ".";
import type { ViewStyle } from "react-native";

export function compose_wrapped_with_rotation(
  widget: core.Rotation,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  child.extendStyle<ViewStyle>({
    transform: [
      {
        rotate: `${widget.rotation}deg`,
      },
    ],
  });
  return child;
}
