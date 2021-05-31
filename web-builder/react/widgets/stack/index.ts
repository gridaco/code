import { JSX, JSXElementLike, css } from "coli";

import { ReactMultiChildWidget } from "../widget";

import type { ReactWidgets } from "..";
export class Stack extends ReactMultiChildWidget {
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
}
