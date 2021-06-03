import { JSX, JSXElementLike, css } from "coli";

import { ReactMultiChildWidget } from "../widget";

import type { ReactWidgets } from "..";
import { WidgetKey } from "@coli.codes/web-builder-core";
export class Stack extends ReactMultiChildWidget {
  readonly _type = "stack";
  constructor(p: { key: WidgetKey; children: Array<ReactWidgets> }) {
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
