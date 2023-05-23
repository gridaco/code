import { compose } from "@designto/web";
import { vanilla as config, preview as prvconfig } from "@grida/builder-config";
import { Widget } from "@reflect-ui/core";
import {
  export_inlined_css_html_file,
  export_vanilla_preview_source,
} from "@web-builder/vanilla";
import { JsxWidget } from "@web-builder/core";
import type { Plugin } from "@code-plugin/core";

export function buildVanillaFile(
  widget: JsxWidget,
  config: config.VanillaFrameworkConfig,
  plugins?: ReadonlyArray<Plugin>
): config.VanillaComponentOutput {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }

  const html = export_inlined_css_html_file(widget, {
    plugins,
    additional_css_declarations:
      config.additional_css_declaration?.declarations,
  });

  return {
    id: widget.key.id,
    name: widget.key.name,
    code: {
      raw: html.code,
    },
    scaffold: {
      raw: html.code,
    },
    main: {
      raw: html.code,
    },
  };
}

export function buildVanillaPreviewFile(
  widget: JsxWidget,
  config: prvconfig.VanillaPreviewFrameworkConfig,
  plugins?: ReadonlyArray<Plugin>
): config.VanillaComponentOutput {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }

  const html = export_vanilla_preview_source(widget, {
    plugins,
    additional_css_declarations:
      config.additional_css_declaration?.declarations,
  });

  return {
    id: widget.key.id,
    name: widget.key.name,
    code: {
      raw: html.code,
    },
    scaffold: {
      raw: html.code,
    },
    main: {
      raw: html.code,
    },
  };
}

export function buildVanillaWidget(
  widget: Widget,
  config: config.VanillaFrameworkConfig
) {
  if (!widget) {
    throw "A valid reflect widget manifest should be passed as an input. none was passed.";
  }

  return compose(widget, {
    img_no_alt: config.imgage_alt?.no_alt ?? false,
  });
}
