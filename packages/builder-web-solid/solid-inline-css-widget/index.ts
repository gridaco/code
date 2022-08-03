import type { JsxWidget } from "@web-builder/core";
import { solid as solid_config } from "@grida/builder-config";
import {
  SolidInlineCssBuilder,
  SolidInlineCssWidgetModuleExportable,
} from "./solid-inline-css-module-builder";

export default function finalizeSolidWidget_InlineCSS(
  entry: JsxWidget,
  {
    styling,
    exporting,
  }: {
    styling: solid_config.SolidInlineCssConfig;
    exporting: solid_config.SolidComponentExportingCofnig;
  }
) {
  const builder = new SolidInlineCssBuilder({ entry, config: styling });
  return builder.asExportableModule().finalize(exporting);
}

export { SolidInlineCssBuilder, SolidInlineCssWidgetModuleExportable };
