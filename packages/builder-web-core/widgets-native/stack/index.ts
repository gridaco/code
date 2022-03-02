import { JSX } from "coli";
import {
  MultiChildWidget,
  StylableJSXElementConfig,
  StylableJsxWidget,
} from "@web-builder/core";
import { WidgetKey } from "../..";
import { CSSProperties, CSSProperty } from "@coli.codes/css";
import * as css from "@web-builder/styles";
import {
  Background,
  BoxShadowManifest,
  Border,
  BorderRadiusManifest,
  Clip,
  DimensionLength,
} from "@reflect-ui/core";
import { CssMinHeightMixin } from "../../widgets";

export class Stack extends MultiChildWidget implements CssMinHeightMixin {
  readonly _type = "stack";

  width: DimensionLength;
  height: DimensionLength;
  minWidth?: DimensionLength;
  maxWidth?: DimensionLength;
  minHeight?: DimensionLength;
  maxHeight?: DimensionLength;

  borderRadius?: BorderRadiusManifest;
  border?: Border;
  clipBehavior?: Clip;

  constructor(p: {
    key: WidgetKey;
    children: Array<StylableJsxWidget>;

    width: DimensionLength;
    height: DimensionLength;
    minWidth?: DimensionLength;
    maxWidth?: DimensionLength;
    minHeight?: DimensionLength;
    maxHeight?: DimensionLength;

    boxShadow?: BoxShadowManifest[];
    borderRadius?: BorderRadiusManifest;
    border?: Border;
    background?: Background;
    clipBehavior?: Clip;
  }) {
    super(p);

    this.width = p.width;
    this.height = p.height;
    this.minWidth = p.minWidth;
    this.maxWidth = p.maxWidth;
    this.minHeight = p.minHeight;
    this.maxHeight = p.maxHeight;

    this.background = p.background;
    this.borderRadius = p.borderRadius;
    this.boxShadow = p.boxShadow;

    // stack specific
    this.clipBehavior = p.clipBehavior;
    this.border = p.border;
  }

  jsxConfig(): StylableJSXElementConfig {
    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      width: css.length(this.width),
      height: css.length(this.height),
      "min-width": css.length(this.minWidth),
      "max-width": css.length(this.maxWidth),
      "min-height": css.length(this.minHeight),
      "max-height": css.length(this.maxHeight),

      overflow: clip(this.clipBehavior),
      ...css.background(this.background),
      ...css.border(this.border),
      ...css.borderRadius(this.borderRadius),
      // for stacking elements under parent, parent's position shall be relative, children shall be absolute with anchor (e.g. bottom: 0)
      // can it be always relative?
      position: "relative",
      "box-shadow": css.boxshadow(...(this.boxShadow ?? [])),
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
