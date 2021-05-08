import { Widget } from "@reflect-ui/core";
import { buildReactWidgetFromReflectWidget } from "./build-widget";
export function buildReactApp(
  widget: Widget,
  options: { template: "cra" | "nextjs" }
) {
  throw "not implemented";
}

export function buildReactWidget(widget: Widget) {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }
  return buildReactWidgetFromReflectWidget(widget);
}
