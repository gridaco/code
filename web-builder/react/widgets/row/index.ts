import { JSXElement } from "coli";
import { CSSStyleDeclaration } from "coli/lib/languages/css";
import { ReactMultiChildWidget } from "../widget";

export class Row extends ReactMultiChildWidget {
  buildStyle(): CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElement {
    throw new Error("Method not implemented.");
  }
}
