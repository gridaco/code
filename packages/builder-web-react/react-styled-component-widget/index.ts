export * from "./from-reusable-widget-tree";

import { JsxWidget } from "@web-builder/core";
import { ReactComponentExportResult } from "@web-builder/react-core";
import { react as react_config } from "@grida/builder-config";
import {
  ReactStyledComponentsModuleBuilder,
  ReactStyledComponentWidgetModuleExportable,
} from "./react-styled-components-module-builder";

interface Config {
  styling: react_config.ReactStyledComponentsConfig;
  exporting: react_config.ReactComponentExportingCofnig;
}

/**
 * styled components pattern with either emotion or styled-component
 * @todo - this is not fully implemented
 * @param entry
 * @returns
 */
export default function finalizeReactWidget_StyledComponents(
  entry: JsxWidget,
  { styling, exporting }: Config
): ReactComponentExportResult {
  const builder = new ReactStyledComponentsModuleBuilder({
    entry,
    config: styling,
  });
  return builder.asExportableModule().finalize(exporting);
}

export {
  ReactStyledComponentsModuleBuilder,
  ReactStyledComponentWidgetModuleExportable,
};
