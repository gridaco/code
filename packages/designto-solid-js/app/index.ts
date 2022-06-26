import { Widget } from "@reflect-ui/core";
import { buildWebWidgetFromTokens } from "@designto/web/tokens-to-web-widget";
import { JsxWidget } from "@web-builder/core";
import { solid as config } from "@designto/config";
import { finalizeSolidWidget_StyledComponents } from "@web-builder/solid-js";
export function buildSolidApp(
  entry: JsxWidget,
  config: config.SolidFrameworkConfig
): config.SolidComponentOutput {
  switch (config.styling.type) {
    // TODO:
    // case "inline-css": {
    //   break;
    // }
    case "styled-components": {
      const res = finalizeSolidWidget_StyledComponents(entry, {
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
    default: {
      throw (
        "Unexpected styling type for solid-js framework: " + config.styling.type
      );
    }
  }
  // return;
}
