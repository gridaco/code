import { JsxWidget } from "@web-builder/core";
import {
  react as react_config,
  reactnative as reactnative_config,
} from "@grida/builder-config";
import { ReactNativeInlineStyleBuilder } from "./rn-inline-style-module-builder";

export function finalizeReactNativeWidget_InlineStyle(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: reactnative_config.ReactNativeInlineStyleConfig;
    exporting: react_config.ReactComponentExportingCofnig;
  }
) {
  const builder = new ReactNativeInlineStyleBuilder({
    entry,
    config: styling,
  });
  return builder.asExportableModule().finalize(exporting);
}
