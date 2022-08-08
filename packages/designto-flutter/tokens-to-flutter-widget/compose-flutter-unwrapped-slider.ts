import * as flutter from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";
import { onChanged } from "../static-snippets";
import * as dartui from "../dart-ui";

export function compose_flutter_unwrapped_slider(
  key: flutter.Key,
  widget: core.ProgressIndicator,
  container?: core.Container
): flutter.Slider {
  return new flutter.Slider({
    key,
    activeColor: dartui.color(widget.backgroundColor),
    // autofocus: widget.autofocus,
    // inactiveColor: dartui.color(widget.inactiveColor),
    // label: widget.label,
    // max: widget.max,
    // min: widget.min,
    onChanged: onChanged.double,
    thumbColor: dartui.color(widget.color),
    value: widget.value || 0,
  });
}
