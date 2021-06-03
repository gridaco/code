import { stringfy } from "@coli.codes/export-string";
import { makeAsStyled } from "@web-builder/styled";
import { ReactWidget } from "../../widgets";

/**
 * styled components pattern with either emotion or styled-component
 * @todo - this is not fully implemented
 * @param widget
 * @returns
 */
export function stringfyReactWidget_STYLED_COMPONENTS(
  widget: ReactWidget
): string {
  const styled = makeAsStyled(widget);
  console.log("styled", styled);

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
