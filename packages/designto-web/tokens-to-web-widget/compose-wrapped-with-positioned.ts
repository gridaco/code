import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";

export function compose_wrapped_with_positioned(
  widget: core.Positioned,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  // -------------------------------------
  // TODO: check the version history and investigate why this was added
  // override w & h with position provided w/h
  child.extendStyle({
    // unless it was cleared intentionally
    width: child.width === undefined ? undefined : css.length(widget.width),
    // unless it was cleared intentionally
    height: child.height === undefined ? undefined : css.length(widget.height),
  });
  // -------------------------------------
  child.constraint = {
    left: widget.left,
    top: widget.top,
    right: widget.right,
    bottom: widget.bottom,
  };
  return child;
}
