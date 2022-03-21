import * as web from "@web-builder/core";
import * as core from "@reflect-ui/core";

export function compose_unwrapped_text_input(
  key,
  widget: core.TextField,
  container?: core.Container
): web.TextInput {
  return new web.TextInput({ ...(container ?? {}), ...widget, key });
}
