import { JSX, JSXElementLike, css } from "coli";

import { ReactMultiChildWidget, ReactWidget } from "../../widgets/widget";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { boxshadow, CSSProperties, px } from "@coli.codes/css";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
export class Stack extends ReactMultiChildWidget {
  readonly _type = "stack";

  width: number;
  height: number;

  constructor(p: {
    key: WidgetKey;
    children: Array<ReactWidget>;
    width: number;
    height: number;
    boxShadow?: BoxShadowManifest;
  }) {
    super(p);

    this.width = p.width;
    this.height = p.height;
    this.boxShadow = p.boxShadow;
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      width: px(this.width),
      height: px(this.height),
      "box-shadow": boxshadow(this.boxShadow),
    };
  }
}
