import { ReactMultiChildWidget } from "../widget";
import { JSX, JSXElementLike, css } from "coli";
import { CSSProperties } from "@coli.codes/css";

export class Row extends ReactMultiChildWidget {
  readonly _type = "row";
  buildContainingJsx(children: JSXElementLike[]): JSXElementLike {
    return JSX.div({
      children: children,
    }).make();
  }

  buildStyle(): CSSProperties {
    return {
      display: "flex",
      "flex-direction": "row",
    };
  }
}
