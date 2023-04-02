import * as web from "@web-builder/core";
import * as core from "@reflect-ui/core";

export function compose_unwrapped_slider(
  key,
  widget: core.Slider,
  container?: core.Container
): web.Slider {
  return new web.Slider({ ...(container ?? {}), ...widget, key });
}
