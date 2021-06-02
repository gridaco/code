import { ReactMultiChildWidget } from "../widget";
import { JSX, JSXElementLike, css } from "coli";

export class Row extends ReactMultiChildWidget {
  readonly _type = "row";
  buildContainingJsx(children: JSXElementLike[]): JSXElementLike {
    return JSX.div({
      children: children,
    }).make();
  }

  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
}
