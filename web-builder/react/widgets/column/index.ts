import { CSSProperties } from "@coli.codes/css";
import { WidgetKey } from "@coli.codes/web-builder-core";
import { JSX, JSXElementLike } from "coli";
import { ReactMultiChildWidget, ReactWidget } from "../widget";

export class Column extends ReactMultiChildWidget {
  readonly _type = "column";
  constructor(p: { key: WidgetKey; children: Array<ReactWidget> }) {
    super(p);
  }

  jsxConfig() {
    return {
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      display: "flex",
      "flex-direction": "column",
    };
  }
}
