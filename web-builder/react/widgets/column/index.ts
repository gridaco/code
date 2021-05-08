import { JSXElementLike } from "coli";
import { CSSStyleDeclaration } from "coli/lib/languages/css";
import { ReactMultiChildWidget } from "../widget";

export class Column extends ReactMultiChildWidget {
  constructor() {
    super();
  }
  buildStyle(): CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElementLike {
    throw new Error("Method not implemented.");
  }
}
