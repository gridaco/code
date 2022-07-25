import { Widget } from "@reflect-ui/core";
import { reactnative as config } from "@designto/config";
import { JsxWidget } from "@web-builder/react";
import assert from "assert";
import build from "@web-builder/react-native";
import { buildRNWidgetFromTokens } from "../tokens-to-rn-widget";

const builders = {
  "react-native-stylesheet": build.with_stylesheet,
  "styled-components": build.with_styled_components,
  "inline-css": build.with_inline_style,
} as const;

/**
 *
 */
export function buildReactNativeApp(
  entry: JsxWidget,
  config: config.ReactNativeFrameworkConfig
): config.ReactNativeComponentOutput {
  if (!builders[config.styling.type])
    throw new Error(
      `RN: Unsupported styling type: ${
        // @ts-ignore
        config.styling.type
      }`
    );

  const res = builders[config.styling.type](entry, {
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

export function buildReactNativeWidget(widget: Widget) {
  assert(
    widget instanceof Widget,
    "A valid reflect widget manifest should be passed as an input. none was passed."
  );

  return buildRNWidgetFromTokens(widget, {});
}
