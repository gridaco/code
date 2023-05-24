import { JsxWidget } from "@web-builder/core";
import {
  HtmlIdCssModuleBuilder,
  HtmlModuleBuilderConfig,
} from "../html-css-id-widget";

export function export_inlined_css_html_file(
  widget: JsxWidget,
  config: HtmlModuleBuilderConfig
) {
  const builder = new HtmlIdCssModuleBuilder({ entry: widget, config });
  return builder.export();
}

export function export_vanilla_preview_source(
  widget: JsxWidget,
  config: HtmlModuleBuilderConfig
) {
  const builder = new HtmlIdCssModuleBuilder({
    entry: widget,
    config: {
      fonts: {
        services: ["system", "fonts.google.com"],
      },
      ...config,
      // required (for safety, for consistant preview)
      disable_all_optimizations: true,
    },
  });
  return builder.export();
}
