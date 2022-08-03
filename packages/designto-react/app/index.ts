import { Widget } from "@reflect-ui/core";
import { buildWebWidgetFromTokens } from "@designto/web";
import build, { BuilderFunc, JsxWidget } from "@web-builder/react";
import { react as config, react } from "@grida/builder-config";
import assert from "assert";

const builders: {
  [key in react.ReactFrameworkConfig["styling"]["type"]]: BuilderFunc<any>;
} = {
  "styled-components": build.with_styled_components,
  "inline-css": build.with_inline_css,
  "css-module": build.with_css_module,
  css: () => {
    throw "not implemented";
  },
} as const;

export function buildReactApp(
  entry: JsxWidget,
  config: react.ReactFrameworkConfig
): config.ReactComponentOutput {
  const res = builders[config.styling.type](entry, {
    exporting: config.component_declaration_style.exporting_style,
    styling: config.styling,
  });

  return {
    id: entry.key.id,
    name: entry.key.name,
    code: { raw: res.code },
    scaffold: { raw: res.code },
  };
}

export function buildReactWidget(widget: Widget) {
  assert(
    widget instanceof Widget,
    "A valid reflect widget manifest should be passed as an input. none was passed."
  );

  return buildWebWidgetFromTokens(widget, {});
}

// EXPERIMENTAL
import { finalizeReactReusable_StyledComponents__Experimental } from "@web-builder/react/react-styled-component-widget";

/**
 * Experimental components support for react
 */
export function buildReusableReactApp__Experimental({
  tree,
  components,
}: {
  tree;
  components;
}) {
  console.info("starting experimental react reusable components build");

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
