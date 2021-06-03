import { JSX, JSXElementLike, css } from "coli";

import { ReactMultiChildWidget, ReactWidget } from "../widget";
import { WidgetKey } from "@coli.codes/web-builder-core";
import { CSSProperties } from "@coli.codes/css";
export class Stack extends ReactMultiChildWidget {
  readonly _type = "stack";
  constructor(p: { key: WidgetKey; children: Array<ReactWidget> }) {
    super(p);
  }

  buildContainingJsx(children: JSXElementLike[]): JSXElementLike {
    return JSX.div({
      children: children,
    }).make();
  }

  buildStyle(): CSSProperties {
    throw new Error("Method not implemented.");
  }
}
