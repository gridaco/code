import { Widget } from "@reflect-ui/core";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import {
  finalizePreactWidget_StyledComponents,
  finalizePreactWidget_InlineCss,
  finalizePreactWidget_CssModule,
} from "@web-builder/preact";
import { preact as config, preact } from "@designto/config";
import type { JsxWidget } from "@web-builder/core";
import assert from "assert";
export function buildPreactApp(
  entry: JsxWidget,
  config: preact.PreactFrameworkConfig
): config.PreactComponentOutput {
  switch (config.styling.type) {
    case "styled-components": {
      const res = finalizePreactWidget_StyledComponents(entry, {
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
    case "inline-css": {
      const res = finalizePreactWidget_InlineCss(entry, {
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
    case "css-module": {
      const res = finalizePreactWidget_CssModule(entry, {
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
    default: {
      throw new Error(`${config.styling.type} not supported yet`);
      break;
    }
  }
}

export function buildPreactWidget(widget: Widget) {
  assert(
    widget instanceof Widget,
    "A valid reflect widget manifest should be passed as an input. none was passed."
  );

  return buildWebWidgetFromTokens(widget, {});
}
