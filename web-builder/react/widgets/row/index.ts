import { ReactMultiChildWidget } from "../widget";
import { JSX, JSXElementLike, css } from "coli";

export class Row extends ReactMultiChildWidget {
  buildContainingJsx(children: JSXElementLike[]): JSXElementLike {
    return JSX.div({
      children: children,
    }).make();
  }

  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
}
