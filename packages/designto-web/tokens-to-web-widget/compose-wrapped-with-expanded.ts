import type { Composer } from ".";
import { Expanded } from "@reflect-ui/core";

export function compose_wrapped_with_expanded(
  widget: Expanded,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  child.extendStyle({
    flex: widget.flex,
  });
  return child;
}
