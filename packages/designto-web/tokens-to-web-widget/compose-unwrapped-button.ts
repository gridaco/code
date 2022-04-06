import * as web from "@web-builder/core";
import * as core from "@reflect-ui/core";

export function compose_unwrapped_button(
  key,
  widget: core.ButtonStyleButton,
  container?: core.Container
): web.HtmlButton {
  return new web.HtmlButton({ ...(container ?? {}), ...widget, key });
}
