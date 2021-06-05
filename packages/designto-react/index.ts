import { Widget } from "@reflect-ui/core";
import { buildReactWidgetFromReflectWidget } from "./build-widget";
import {
  ReactWidget,
  stringfyReactWidget_STYLED_COMPONENTS,
} from "@coli.codes/react-builder";
import { ReactComponentExportResult } from "@coli.codes/react-builder/export/export-result";

export function buildReactApp(
  widget: ReactWidget,
  options: { template: "cra" | "nextjs" }
): ReactComponentExportResult {
  return stringfyReactWidget_STYLED_COMPONENTS(widget);
}

export function buildReactWidget(widget: Widget) {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }
  return buildReactWidgetFromReflectWidget(widget);
}
