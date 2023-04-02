import * as flutter from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";
import * as dartui from "../dart-ui";

export function compose_flutter_unwrapped_progress_indicator(
  key: flutter.Key,
  widget: core.ProgressIndicator,
  container?: core.Container
): flutter.ProgressIndicator {
  if (widget instanceof core.LinearProgressIndicator) {
    return new flutter.LinearProgressIndicator({
      key,
      backgroundColor: dartui.color(widget.backgroundColor),
      color: dartui.color(widget.color),
      semanticsLabel: widget.semanticsLabel,
      value: widget.value,
    });
  } else if (widget instanceof core.CircularProgressIndicator) {
    return new flutter.CircularProgressIndicator({
      key,
      backgroundColor: dartui.color(widget.backgroundColor),
      color: dartui.color(widget.color),
      semanticsLabel: widget.semanticsLabel,
      value: widget.value,
      strokeWidth: widget.strokeWidth,
    });
  } else {
    throw new Error("unsupported progress indicator");
  }
}
