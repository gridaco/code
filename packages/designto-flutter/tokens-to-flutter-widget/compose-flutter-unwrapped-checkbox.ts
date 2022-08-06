import * as flutter from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";
import { onChanged } from "../static-snippets";
import * as dartui from "../dart-ui";
import * as painting from "../painting";

export function compose_flutter_unwrapped_checkbox(
  key: flutter.Key,
  widget: core.Checkbox,
  container?: core.Container
): flutter.Checkbox {
  return new flutter.Checkbox({
    key,
    onChanged: onChanged.boolean,
    activeColor: dartui.color(widget.activeColor),
    autofocus: widget.autofocus,
    checkColor: dartui.color(widget.checkColor),
    // fillColor: dartui.color(widget.fillColor.default),
    focusColor: dartui.color(widget.focusColor),
    hoverColor: dartui.color(widget.hoverColor),
    // overlayColor: dartui.color(widget.overlayColor),
    // TODO:
    // shape: widget.shape,
    // TODO:
    // side: painting.borderSide(widget.side),
    value: widget.value || false,
  });
}
