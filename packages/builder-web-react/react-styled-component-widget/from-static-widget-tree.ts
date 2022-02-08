import { JsxWidget, StylableJsxWidget } from "@web-builder/core";
import { ReactComponentExportResult } from "../export-result";
import { react as react_config } from "@designto/config";
import { ReactStyledComponentsBuilder } from "./react-styled-components-module-builder";

/**
 * styled components pattern with either emotion or styled-component
 * @todo - this is not fully implemented
 * @param entry
 * @returns
 */
export function finalizeReactWidget_StyledComponents(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: react_config.ReactStyledComponentsConfig;
    exporting: react_config.ReactComponentExportingCofnig;
  }
): ReactComponentExportResult {
  const builder = new ReactStyledComponentsBuilder({ entry, config: styling });
  return builder.asExportableModule().finalize(exporting);
}
