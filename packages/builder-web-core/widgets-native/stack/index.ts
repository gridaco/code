import { JSX } from "coli";

import { MultiChildWidget, WidgetTree } from "@web-builder/core";
import { JSXElementConfig, WidgetKey } from "../..";
import { CSSProperties, CSSProperty } from "@coli.codes/css";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import * as css from "@web-builder/styles";
import {
  BorderRadiusManifest,
  Clip,
  Color,
  DimensionLength,
} from "@reflect-ui/core";
import { CssMinHeightMixin } from "../_utility";

export class Stack extends MultiChildWidget implements CssMinHeightMixin {
  readonly _type = "stack";

  width: number;
  height: number;
  minHeight?: DimensionLength;
  borderRadius?: BorderRadiusManifest;
  clipBehavior?: Clip;

  constructor(p: {
    key: WidgetKey;
    children: Array<WidgetTree>;
    width: number;
    height: number;
    minHeight?: DimensionLength;
    boxShadow?: BoxShadowManifest;
    borderRadius?: BorderRadiusManifest;
    clipBehavior?: Clip;
    color?: Color;
  }) {
    super(p);
    this.color = p.color;
    this.width = p.width;
    this.height = p.height;
    this.borderRadius = p.borderRadius;
    this.boxShadow = p.boxShadow;
    this.clipBehavior = p.clipBehavior;
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
      overflow: clip(this.clipBehavior),
      ...css.background(this.color),
      ...css.borderRadius(this.borderRadius),
      // for stacking elements under parent, parent's position shall be relative, children shall be absolute with anchor (e.g. bottom: 0)
      // can it be always relative?
      position: "relative",
      "box-shadow": css.boxshadow(this.boxShadow),
    };
  }
}

function clip(clip: Clip): CSSProperty.Overflow {
  switch (clip) {
    case Clip.antiAlias:
    case Clip.antiAliasWithSaveLayer:
    case Clip.hardEdge:
      return "hidden";
    case Clip.none:
      return; // or return visible
    default:
      return;
  }
}
