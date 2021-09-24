import { Widget } from "@reflect-ui/core";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import {
  WidgetTree,
  stringfyReactWidget_STYLED_COMPONENTS,
} from "@web-builder/react";
import { react as config } from "@designto/config";

export function buildReactApp(
  widget: WidgetTree,
  options: { template: "cra" | "nextjs" }
): config.ReactComponentOutput {
  const res = stringfyReactWidget_STYLED_COMPONENTS(widget);
  return {
    id: widget.key.id,
    name: widget.key.name,
    code: { raw: res.code },
    scaffold: { raw: res.code },
  };
}

export function buildReactWidget(widget: Widget) {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }
  return buildWebWidgetFromTokens(widget, { is_root: true });
}
