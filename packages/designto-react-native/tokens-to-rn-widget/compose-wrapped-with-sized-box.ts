import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";
import type { ViewStyle } from "react-native";

export function compose_wrapped_with_sized_box(
  widget: core.SizedBox,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  child.extendStyle<ViewStyle>({
    width: css.px(widget.width),
    height: css.px(widget.height),
  });
  return child;
}
