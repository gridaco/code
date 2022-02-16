import { Widget } from "@reflect-ui/core";
import { reactnative as config } from "@designto/config";
import { JsxWidget } from "@web-builder/react";
import assert from "assert";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";

/**
 *
 */
export function buildReactNativeApp(
  entry: JsxWidget,
  config: config.ReactNativeFrameworkConfig
): config.ReactNativeComponentOutput {
  throw "not implemented";
  switch (config.styling.type) {
    case "react-native-stylesheet": {
      break;
    }
    case "styled-components": {
      break;
    }
  }
  return;
}

export function buildReactNativeWidget(widget: Widget) {
  assert(
    widget instanceof Widget,
    "A valid reflect widget manifest should be passed as an input. none was passed."
  );

  return buildWebWidgetFromTokens(widget, {});
}
