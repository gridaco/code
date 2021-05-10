import { JSXElement, css } from "coli";
import { ReactMultiChildWidget } from "../widget";

export class Row extends ReactMultiChildWidget {
  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElement {
    throw new Error("Method not implemented.");
  }
}
