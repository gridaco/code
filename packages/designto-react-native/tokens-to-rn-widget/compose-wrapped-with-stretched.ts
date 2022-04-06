import * as core from "@reflect-ui/core";
import { Composer } from ".";
import { Stretched } from "@designto/token/tokens";
import type { ViewStyle } from "react-native";

export function compose_wrapped_with_clip_stretched(
  widget: Stretched,
  child_composer: Composer
) {
  let remove_size;
  switch (widget.axis) {
    case core.Axis.horizontal:
      remove_size = "height";
      break;
    case core.Axis.vertical:
      remove_size = "width";
      break;
  }

  const child = child_composer(widget.child);
  child.extendStyle<ViewStyle>({
    alignSelf: "stretch",
    [remove_size]: undefined,
  });
  return child;
}
