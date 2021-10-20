import { Widget } from "@reflect-ui/core";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import {
  WidgetTree,
  stringfyReactWidget_STYLED_COMPONENTS,
} from "@web-builder/react";
import { react as config, react } from "@designto/config";
import assert from "assert";
export function buildReactApp(
  entry: WidgetTree,
  config: react.ReactFrameworkConfig
): config.ReactComponentOutput {
  switch (config.styling.type) {
    case "styled-components": {
      const res = stringfyReactWidget_STYLED_COMPONENTS(entry, {
        styling: config.styling,
        exporting: config.component_declaration_style.exporting_style,
      });
      return {
        id: entry.key.id,
        name: entry.key.name,
        code: { raw: res.code },
        scaffold: { raw: res.code },
      };
    }
    case "css":
    case "css-in-jsx":
      throw new Error(`${config.styling.type} not supported yet`);
      break;
  }
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
