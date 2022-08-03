import { JsxWidget } from "@web-builder/core";
import { ReactComponentExportResult } from "@web-builder/react-core";
import { react as react_config } from "@grida/builder-config";
import { PreactCssModuleBuilder } from "./preact-css-module-module-builder";

/**
 * css-module pattern with
 */
export function finalizePreactWidget_CssModule(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: react_config.ReactCssModuleConfig;
    exporting: react_config.ReactComponentExportingCofnig;
  }
): ReactComponentExportResult {
  const builder = new PreactCssModuleBuilder({ entry, config: styling });
  return builder.asExportableModule().finalize(exporting);
}
