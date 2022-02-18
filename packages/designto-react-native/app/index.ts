import { Widget } from "@reflect-ui/core";
import { reactnative as config } from "@designto/config";
import { JsxWidget } from "@web-builder/react";
import assert from "assert";
import { finalizeReactNativeWidget_StyleSheet } from "@web-builder/react-native";
import { buildRNWidgetFromTokens } from "../tokens-to-rn-widget";

/**
 *
 */
export function buildReactNativeApp(
  entry: JsxWidget,
  config: config.ReactNativeFrameworkConfig
): config.ReactNativeComponentOutput {
  switch (config.styling.type) {
    case "react-native-stylesheet": {
      const res = finalizeReactNativeWidget_StyleSheet(entry, {
        styling: config.styling,
        exporting: config.component_declaration_style.exporting_style,
      });
      return {
        id: entry.key.id,
        name: entry.key.name,
        code: { raw: res.code },
        scaffold: { raw: res.code },
      };
      break;
    }
    case "styled-components": {
      throw "styled-components for rn is not yet supported";
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

  return buildRNWidgetFromTokens(widget, {});
}
