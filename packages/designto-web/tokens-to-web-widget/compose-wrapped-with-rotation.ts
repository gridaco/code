import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";

export function compose_wrapped_with_rotation(
  widget: core.Rotation,
  child_composer: Composer
) {
  const child = child_composer(widget.child);

  const r = widget.rotation;
  // don't apply rotation if it's 0
  if (Math.abs(r) === 360 || Math.abs(r) === 360) {
    return child;
  }

  child.extendStyle({
    // rotation data needs to be inverted
    transform: css.rotation(-widget.rotation),
    // this is where the figma's rotation data is originated from.
    // see docs/figma-rotation.md
    "transform-origin": "top left",
  });
  return child;
}
