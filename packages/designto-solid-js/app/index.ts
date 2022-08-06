import { Widget } from "@reflect-ui/core";
import { compose } from "@designto/web";
import { JsxWidget } from "@web-builder/core";
import { solid as config } from "@grida/builder-config";
import {
  finalizeSolidWidget_StyledComponents,
  finalizeSolidWidget_InlineCSS,
} from "@web-builder/solid-js";
export function buildSolidApp(
  entry: JsxWidget,
  config: config.SolidFrameworkConfig
): config.SolidComponentOutput {
  switch (config.styling.type) {
    // TODO:
    case "inline-css": {
      const res = finalizeSolidWidget_InlineCSS(entry, {
        styling: config.styling,
        exporting: config.component_declaration_style.exporting_style,
      });
      return {
        id: entry.key.id,
        name: entry.key.name,
        code: { raw: res.code },
        scaffold: { raw: res.code },
      };
      break;
    }
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
        "Unexpected styling type for solid-js framework: " +
        // @ts-ignore
        config.styling.type
      );
    }
  }
  // return;
}
