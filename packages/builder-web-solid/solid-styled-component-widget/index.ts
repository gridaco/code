import { JsxWidget } from "@web-builder/core";
import { solid as solid_config } from "@designto/config";
import {
  SolidStyledComponentsBuilder,
  SolidStyledComponentWidgetModuleExportable,
} from "./solid-styled-components-module-builder";

export default function finalizeSolidWidget_StyledComponents(
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

export {
  SolidStyledComponentsBuilder,
  SolidStyledComponentWidgetModuleExportable,
};
