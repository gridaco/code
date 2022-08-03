import { JsxWidget } from "@web-builder/core";
import { solid as config } from "@grida/builder-config";
import build from "@web-builder/solid-js";

const builders = {
  "inline-css": build.with_inline_css,
  "styled-components": build.with_styled_components,
} as const;

export function buildSolidApp(
  entry: JsxWidget,
  config: config.SolidFrameworkConfig
): config.SolidComponentOutput {
  if (!builders[config.styling.type])
    throw "Unexpected styling type for solid-js: " + config.styling.type;

  const res = builders[config.styling.type](entry, {
    // @ts-ignore
    styling: config.styling,
    exporting: config.component_declaration_style.exporting_style,
  });

  return {
    id: entry.key.id,
    name: entry.key.name,
    code: { raw: res.code },
    scaffold: { raw: res.code },
  };
}
