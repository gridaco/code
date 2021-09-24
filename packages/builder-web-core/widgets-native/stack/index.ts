import { JSX } from "coli";

import { MultiChildWidget, WidgetTree } from "@web-builder/core";
import { JSXElementConfig, WidgetKey } from "../..";
import { CSSProperties } from "@coli.codes/css";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import * as css from "@web-builder/styles";
import { Color, DimensionLength } from "@reflect-ui/core";
import { CssMinHeightMixin } from "../_utility";

export class Stack extends MultiChildWidget implements CssMinHeightMixin {
  readonly _type = "stack";

  width: number;
  height: number;
  minHeight?: DimensionLength;

  constructor(p: {
    key: WidgetKey;
    children: Array<WidgetTree>;
    width: number;
    height: number;
    minHeight?: DimensionLength;
    boxShadow?: BoxShadowManifest;
    color?: Color;
  }) {
    super(p);
    this.color = p.color;
    this.width = p.width;
    this.height = p.height;
    this.boxShadow = p.boxShadow;
    this.minHeight = p.minHeight;
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      width: css.px(this.width),
      height: css.px(this.height),

      "min-height": css.minHeight(this.minHeight),
      "background-color": css.color(this.color),
      // for stacking elements under parent, parent's position shall be relative, children shall be absolute with anchor (e.g. bottom: 0)
      // can it be always relative?
      position: "relative",
      "box-shadow": css.boxshadow(this.boxShadow),
    };
  }
}
