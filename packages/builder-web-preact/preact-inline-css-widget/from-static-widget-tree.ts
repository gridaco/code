import { JsxWidget } from "@web-builder/core";
import { react as react_config } from "@grida/builder-config";
import { PreactInlineCssBuilder } from "./preact-inline-css-module-builder";

export function finalizePreactWidget_InlineCss(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: react_config.ReactInlineCssConfig;
    exporting: react_config.ReactComponentExportingCofnig;
  }
) {
  const builder = new PreactInlineCssBuilder({
    entry,
    config: styling,
  });
  return builder.asExportableModule().finalize(exporting);
}
