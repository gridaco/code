import { JsxWidget } from "@web-builder/core";
import { ReactComponentExportResult } from "@web-builder/react-core";
import { react as react_config } from "@grida/builder-config";
import {
  ReactCssModuleBuilder,
  ReactCssModuleWidgetModuleExportable,
} from "./react-css-module-module-builder";

interface Config {
  styling: react_config.ReactCssModuleConfig;
  exporting: react_config.ReactComponentExportingCofnig;
}

/**
 * css-module pattern with
 */
export default function finalizeReactWidget_CssModule(
  entry: JsxWidget,
  { styling, exporting }: Config
): ReactComponentExportResult {
  const builder = new ReactCssModuleBuilder({ entry, config: styling });
  return builder.asExportableModule().finalize(exporting);
}

export { ReactCssModuleBuilder, ReactCssModuleWidgetModuleExportable };
