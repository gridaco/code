import { JSX, JSXElementLike } from "coli";
import { css } from "coli";
import { ReactWidgets } from "..";
import { ReactMultiChildWidget } from "../widget";

export class Column extends ReactMultiChildWidget {
  constructor(p: { children: Array<ReactWidgets> }) {
    super(p);
  }
  buildContainingJsx(children: JSXElementLike[]): JSXElementLike {
    return JSX.div({
      children: children,
    }).make();
  }
  buildStyle(): css.CSSStyleDeclaration {
    throw new Error("Method not implemented.");
  }
  buildJsx(): JSXElementLike {
    return JSX.div().make();
  }
}
