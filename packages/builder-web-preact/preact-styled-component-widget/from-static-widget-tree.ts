import { JsxWidget, StylableJsxWidget } from "@web-builder/core";
import { ReactComponentExportResult } from "@web-builder/react-core";
import { react as react_config } from "@grida/builder-config";
import { PreactStyledComponentsBuilder } from "./preact-styled-components-module-builder";

/**
 * styled components pattern with either emotion or styled-component
 * @todo - this is not fully implemented
 * @param entry
 * @returns
 */
export function finalizePreactWidget_StyledComponents(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: react_config.ReactStyledComponentsConfig;
    exporting: react_config.ReactComponentExportingCofnig;
  }
): ReactComponentExportResult {
  const builder = new PreactStyledComponentsBuilder({ entry, config: styling });
  return builder.asExportableModule().finalize(exporting);
}
