import { JSX, JSXElementLike, css } from "coli";

import { ReactWidget } from "../widget";

export class Container extends ReactWidget {
  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElementLike {
    return JSX.div().make();
  }
}
