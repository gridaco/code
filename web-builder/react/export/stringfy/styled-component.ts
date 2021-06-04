import { stringfy, format } from "@coli.codes/export-string";
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
  widget.children?.map((c) => {
    // c.buildJsx()
  });
  const styled = makeAsStyled(widget);
  console.log("styled", styled);

  const jsx = widget.buildJsx();

  const _jsxStr = stringfy(jsx, {
    language: "tsx",
  });

  const finalFile = `
import React from "react"
import styled from "@emotion/styled"

export function Component(){
  return (${_jsxStr});
}x

// styles
${styled}
`;

  return format(finalFile, {
    use: "pritter",
    parser: "typescript",
  });
}
