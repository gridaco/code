import * as core from "@reflect-ui/core";
import { Composer } from ".";
import * as css from "@web-builder/styles";

export function compose_wrapped_with_positioned(
  widget: core.Positioned,
  child_composer: Composer
) {
  const child = child_composer(widget.child);
  // -------------------------------------
  // override w & h with position provided w/h
  child.extendStyle({
    width: css.px(widget.width),
    height: css.px(widget.height),
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
