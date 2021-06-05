import { JSX, JSXElementLike, css } from "coli";

import { ReactMultiChildWidget, ReactWidget } from "../widget";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { CSSProperties } from "@coli.codes/css";
export class Stack extends ReactMultiChildWidget {
  readonly _type = "stack";
  constructor(p: { key: WidgetKey; children: Array<ReactWidget> }) {
    super(p);
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("Stack"),
    };
  }

  styleData(): CSSProperties {
    return {};
  }
}
