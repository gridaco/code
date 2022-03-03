import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";

export function compose_wrapped_with_clip_rrect(
  widget: core.ClipRRect,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  child.extendStyle({
    ...css.borderRadius(widget.borderRadius),
    overflow: "hidden",
    width: "100%", // ----- need better approach
    height: "100%", // ----- need better approach
  });
  return child;
}
