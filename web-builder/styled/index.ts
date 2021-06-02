import { WidgetWithStyle } from "@coli.codes/web-builder-core";
import { ColiBuilder } from "coli";
import { JSX } from "@coli.codes/builder";
import { stringfy } from "@coli.codes/export-string";
import { declareStyledComponentVariable } from "./styled-component-declaration";

export function makeAsStyled(styled: WidgetWithStyle) {
  const jsx = styled.buildJsx();

  if (jsx instanceof ColiBuilder) {
    const styledVar = declareStyledComponentVariable(styled);
    const styledTextTest = stringfy(styledVar, {
      language: "typescript",
    });
    console.log(styledTextTest);
    return (jsx as JSX).copyWith({
      identifier: styledVar.id,
    });
  }
}
