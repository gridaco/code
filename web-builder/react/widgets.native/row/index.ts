import { ReactMultiChildWidget, ReactWidget } from "../../widgets/widget";
import { JSX, JSXElementLike, css } from "coli";
import { boxshadow, CSSProperties } from "@coli.codes/css";
import {
  JSXElementConfig,
  Widget,
  WidgetKey,
} from "@coli.codes/web-builder-core";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";

export class Row extends ReactMultiChildWidget {
  readonly _type = "row";

  constructor({
    key,
    children,
    boxShadow,
  }: {
    key: WidgetKey;
    children: Array<ReactWidget>;
    boxShadow?: BoxShadowManifest;
  }) {
    super({
      key: key,
      children: children,
    });

    this.boxShadow = boxShadow;
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
      "box-shadow": boxshadow(this.boxShadow),
    };
  }
}
