import { JSXElement } from "coli";
import { CSSStyleDeclaration } from "coli/lib/languages/css";
import { ReactWidget } from "../widget";

export class Row extends ReactWidget {
  buildStyle(): CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElement {
    throw new Error("Method not implemented.");
  }
}
