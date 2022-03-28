import * as web from "@web-builder/core";
import * as core from "@reflect-ui/core";

export function compose_unwrapped_progress(
  key,
  widget: core.ProgressIndicator,
  container?: Omit<core.Container, "minHeight">
): web.Progress {
  if (widget instanceof core.LinearProgressIndicator) {
    return new web.Progress({
      ...(container ?? {}),
      ...widget,
      key,
    });
  } else if (widget instanceof core.CircularProgressIndicator) {
    throw new Error(
      "circular progress indicator not supported natively by html"
    );
  } else {
    throw new Error("unsupported progress indicator");
  }
}
