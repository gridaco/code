import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";
import type { ViewStyle } from "react-native";
import { JsxWidget } from "@web-builder/core";

export function compose_wrapped_with_sized_box(
  widget: core.SizedBox,
  child_composer: Composer
): JsxWidget {
  const child = child_composer(widget.child);
  child.extendStyle<ViewStyle>({
    width: css.px(widget.width) as any,
    height: css.px(widget.height) as any,
  });
  return child;
}
