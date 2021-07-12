import { Widget } from "@reflect-ui/core";
import { buildReactWidgetFromReflectWidget } from "./build-widget";
import {
  ReactWidget,
  stringfyReactWidget_STYLED_COMPONENTS,
} from "@coli.codes/react-builder";
import { react as config } from "@designto/config";

export function buildReactApp(
  widget: ReactWidget,
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
  return buildReactWidgetFromReflectWidget(widget);
}
