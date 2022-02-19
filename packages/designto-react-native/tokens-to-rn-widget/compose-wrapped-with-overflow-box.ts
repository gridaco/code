import * as core from "@reflect-ui/core";
import { Composer } from ".";
import type { ViewStyle } from "react-native";

export function compose_wrapped_with_overflow_box(
  widget: core.OverflowBox,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  child.extendStyle<ViewStyle>({
    overflow: "hidden",
  });
  return child;
}
