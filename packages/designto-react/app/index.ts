import { Widget } from "@reflect-ui/core";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import {
  finalizeReactWidget_StyledComponents,
  finalizeReactReusable_StyledComponents__Experimental,
  JsxWidget,
} from "@web-builder/react";
import { react as config, react } from "@designto/config";
import assert from "assert";
export function buildReactApp(
  entry: JsxWidget,
  config: react.ReactFrameworkConfig
): config.ReactComponentOutput {
  switch (config.styling.type) {
    case "styled-components": {
      const res = finalizeReactWidget_StyledComponents(entry, {
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
      throw "not implemented";
      // TODO:
      break;
    }
    case "css":
    default: {
      throw new Error(`${config.styling.type} not supported yet`);
      break;
    }
  }
}

export function buildReactWidget(widget: Widget) {
  assert(
    widget instanceof Widget,
    "A valid reflect widget manifest should be passed as an input. none was passed."
  );

  return buildWebWidgetFromTokens(widget, {});
}

export function buildReusableReactApp__Experimental({
  tree,
  components,
}: {
  tree;
  components;
}) {
  const res = finalizeReactReusable_StyledComponents__Experimental({
    tree,
    components,
  });

  return {
    id: tree.key.id,
    name: tree.key.name,
    code: { raw: res.code }, //res.code
    scaffold: { raw: res.code }, //res.code
  };
}
