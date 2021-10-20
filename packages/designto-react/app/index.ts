import { Widget } from "@reflect-ui/core";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import {
  WidgetTree,
  stringfyReactWidget_STYLED_COMPONENTS,
} from "@web-builder/react";
import { react as config } from "@designto/config";
import assert from "assert";
export function buildReactApp(
  entry: WidgetTree,
  options: { template: "cra" | "nextjs" }
): config.ReactComponentOutput {
  const res = stringfyReactWidget_STYLED_COMPONENTS(entry);
  return {
    id: entry.key.id,
    name: entry.key.name,
    code: { raw: res.code },
    scaffold: { raw: res.code },
  };
}

export function buildReactWidget(widget: Widget) {
  assert(
    widget,
    "A valid reflect widget manifest should be passed as an input. none was passed."
  );

  return buildWebWidgetFromTokens(widget);
}

export function buildReusableReactApp__Experimental() {
  //
}
