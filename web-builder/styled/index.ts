import { WidgetWithStyle } from "@coli.codes/web-builder-core";
import { ColiBuilder, JSXElement } from "coli";
import { JSX } from "@coli.codes/builder";
import { stringfy } from "@coli.codes/export-string";
import { declareStyledComponentVariable } from "./styled-component-declaration";

export function makeAsStyled(styled: WidgetWithStyle) {
  const jsx = styled.buildJsx();

  const styledVar = declareStyledComponentVariable(styled);
  const styledTextTest = stringfy(styledVar, {
    language: "typescript",
  });
  console.log("styled", styledTextTest);
  if (jsx instanceof ColiBuilder) {
    return (jsx as JSX).copyWith({
      identifier: styledVar.id,
    });
  } else if (jsx instanceof JSXElement) {
    jsx.changeTag(styledVar.id);
  } else {
    console.error(
      `unhandled styled component conversion of widget type of ${typeof jsx}`,
      jsx
    );
  }
}
