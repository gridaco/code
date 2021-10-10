import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";

export function compose_wrapped_with_rotation(
  widget: core.Rotation,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  child.extendStyle({
    transform: css.rotation(widget.rotation),
  });
  return child;
}
