import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";
import type { ViewStyle } from "react-native";

export function compose_wrapped_with_opacity(
  widget: core.Opacity,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  child.extendStyle<ViewStyle>({
    opacity: css.opacity(widget.opacity),
  });
  return child;
}
