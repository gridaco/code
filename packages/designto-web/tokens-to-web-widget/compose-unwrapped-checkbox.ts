import * as web from "@web-builder/core";
import * as core from "@reflect-ui/core";

export function compose_unwrapped_checkbox(
  key,
  widget: core.Checkbox,
  container?: core.Container
): web.Checkbox {
  return new web.Checkbox({ ...(container ?? {}), ...widget, key });
}
