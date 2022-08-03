import { JsxWidget, StylableJsxWidget } from "@web-builder/core";
import { solid as solid_config } from "@grida/builder-config";
import { SolidStyledComponentsBuilder } from "./solid-styled-components-module-builder";

export function finalizeSolidWidget_StyledComponents(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: solid_config.SolidStyledComponentsConfig;
    exporting: solid_config.SolidComponentExportingCofnig;
  }
) {
  const builder = new SolidStyledComponentsBuilder({ entry, config: styling });
  return builder.asExportableModule().finalize(exporting);
}
