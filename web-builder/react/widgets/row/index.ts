import { ReactMultiChildWidget, ReactWidget } from "../widget";
import { JSX, JSXElementLike, css } from "coli";
import { CSSProperties } from "@coli.codes/css";
import {
  JSXElementConfig,
  Widget,
  WidgetKey,
} from "@coli.codes/web-builder-core";

export class Row extends ReactMultiChildWidget {
  readonly _type = "row";

  constructor({
    key,
    children,
  }: {
    key: WidgetKey;
    children: Array<ReactWidget>;
  }) {
    super({
      key: key,
      children: children,
    });
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      display: "flex",
      "flex-direction": "row",
    };
  }
}
