import { IWidgetWithStyle } from "@coli.codes/web-builder-core/widget-with-style";
import { stringfy } from "@coli.codes/export-string";

/**
 * styled components pattern with either emotion or styled-component
 * @todo - this is not fully implemented
 * @param widget
 * @returns
 */
export function stringfyReactWidget_STYLED_COMPONENTS(
  widget: IWidgetWithStyle
): string {
  const jsx = widget.buildJsx();
  const _jsxStr = stringfy(jsx, {
    language: "tsx",
    formatter: {
      use: "pritter",
      parser: "typescript",
    },
  });

  return _jsxStr;
}
