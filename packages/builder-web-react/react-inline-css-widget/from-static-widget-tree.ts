import { JsxWidget } from "@web-builder/core";
import { react as react_config } from "@grida/builder-config";
import { ReactInlineCssBuilder } from "./react-inline-css-module-builder";

export function finalizeReactWidget_InlineCss(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: react_config.ReactInlineCssConfig;
    exporting: react_config.ReactComponentExportingCofnig;
  }
) {
  const builder = new ReactInlineCssBuilder({
    entry,
    config: styling,
  });
  return builder.asExportableModule().finalize(exporting);
}
