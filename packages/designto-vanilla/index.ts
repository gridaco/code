import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import { vanilla as config } from "@designto/config";
import { Widget } from "@reflect-ui/core";
import { export_inlined_css_html_file } from "@web-builder/vanilla";
import { StylableJsxWidget } from "@web-builder/core";

export function buildVanillaFile(
  widget: StylableJsxWidget
): config.VanillaComponentOutput {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }

  const html = export_inlined_css_html_file(widget);
  return {
    id: widget.key.id,
    name: widget.key.name,
    code: {
      raw: html.code,
    },
    scaffold: {
      raw: html.code,
    },
  };
}

export function buildVanillaWidget(widget: Widget) {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }

  return buildWebWidgetFromTokens(widget);
}
