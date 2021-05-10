import { JSX, JSXElementLike } from "coli";
import { css } from "coli";
import { ReactMultiChildWidget } from "../widget";

export class Column extends ReactMultiChildWidget {
  constructor() {
    super();
  }
  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElementLike {
    return JSX.div().make();
  }
}
