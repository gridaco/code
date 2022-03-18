import { CSSProperties, CSSProperty } from "@coli.codes/css";
import { StylableJSXElementConfig, WidgetKey } from "../..";
import {
  Axis,
  Border,
  BorderRadiusManifest,
  BoxShadowManifest,
  CrossAxisAlignment,
  DimensionLength,
  EdgeInsets,
  MainAxisAlignment,
  VerticalDirection,
  IFlexManifest,
} from "@reflect-ui/core";
import { MainAxisSize } from "@reflect-ui/core/lib/main-axis-size";
import { JSX } from "coli";
import {
  MultiChildWidget,
  StylableJsxWidget,
} from "@web-builder/core/widget-tree/widget";
import { Background } from "@reflect-ui/core/lib/background";
import * as css from "@web-builder/styles";
import { tricks } from "@web-builder/styles";
import { CssMinHeightMixin } from "../../widgets";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export class Flex extends MultiChildWidget implements CssMinHeightMixin {
  readonly _type: "row" | "column";

  mainAxisAlignment?: MainAxisAlignment;
  mainAxisSize?: MainAxisSize;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
  margin?: EdgeInsets;
  padding?: EdgeInsets;
  background?: Background;
  // indicates the spacing between items
  itemSpacing?: number;
  flex?: number;

  readonly direction: Axis;

  // css only properties
  readonly overflow?: CSSProperty.Overflow;

  borderRadius?: BorderRadiusManifest;
  border?: Border;

  minWidth?: DimensionLength;
  maxWidth?: DimensionLength;
  minHeight?: DimensionLength;
  maxHeight?: DimensionLength;

  flexWrap?: FlexWrap;

  constructor(
    p: IFlexManifest<StylableJsxWidget> & {
      // direction: "row" | "column";
      key: WidgetKey;
      width?: DimensionLength;
      height?: DimensionLength;
      minWidth?: DimensionLength;
      maxWidth?: DimensionLength;
      minHeight?: DimensionLength;
      maxHeight?: DimensionLength;
      mainAxisAlignment?: MainAxisAlignment;
      mainAxisSize?: MainAxisSize;
      crossAxisAlignment?: CrossAxisAlignment;
      verticalDirection?: VerticalDirection;
      margin?: EdgeInsets;
      boxShadow?: BoxShadowManifest[];
      padding?: EdgeInsets;
      background?: Background;
      overflow?: CSSProperty.Overflow;
      borderRadius?: BorderRadiusManifest;
      border?: Border;
      flexWrap?: FlexWrap;
    }
  ) {
    super(p);

    this.width = p.width;
    this.height = p.height;

    this.minWidth = p.minWidth;
    this.maxWidth = p.maxWidth;
    this.minHeight = p.minHeight;
    this.maxHeight = p.maxHeight;

    // flex related
    this.direction = p.direction;
    this.itemSpacing = p.itemSpacing;
    this.flex = p.flex;
    this.mainAxisAlignment = p.mainAxisAlignment;
    this.mainAxisSize = p.mainAxisSize;
    this.crossAxisAlignment = p.crossAxisAlignment;
    this.verticalDirection = p.verticalDirection;
    this.flexWrap = p.flexWrap; // cssonly
    //

    //
    this.margin = p.margin;
    this.padding = p.padding;
    this.background = p.background;
    this.borderRadius = p.borderRadius;
    this.border = p.border;
    this.boxShadow = p.boxShadow;

    // css only
    this.overflow = p.overflow;
  }

  jsxConfig(): StylableJSXElementConfig {
    return {
      type: "tag-and-attr",
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      display: "flex",
      overflow: this.overflow,
      ...css.justifyContent(this.mainAxisAlignment),
      "flex-direction": direction(this.direction),
      "align-items": flex_align_items(this.crossAxisAlignment),
      flex: this.flex,
      "flex-wrap": this.flexWrap,
      gap:
        // if justify-content is set to space-between, do not set the gap.
        this.mainAxisAlignment == MainAxisAlignment.spaceBetween
          ? undefined
          : this.itemSpacing && css.px(this.itemSpacing),
      "box-shadow": css.boxshadow(...(this.boxShadow ?? [])),
      ...css.border(this.border),
      ...css.borderRadius(this.borderRadius),
      ...tricks.flexsizing({ ...this }),

      "min-width": css.length(this.minWidth),
      "max-width": css.length(this.maxWidth),
      "min-height": css.length(this.minHeight),
      "max-height": css.length(this.maxHeight),

      ...css.background(this.background),
      "box-sizing": (this.padding && "border-box") || undefined,
      ...css.padding(this.padding),
    };
  }
}

function direction(axis: Axis): CSSProperty.FlexDirection {
  switch (axis) {
    case Axis.horizontal:
      return "row";
    case Axis.vertical:
      return "column";
  }
  throw `axis value of "${axis}" is not a valid reflect Axis value.`;
}

/**
 * explicit css value with `flex-` prefix for start, end
 * why? - "start" and "end" also attributes to the box itself -> to be more flex-specific.
 * @param alignment
 * @returns
 */
function flex_align_items(alignment: CrossAxisAlignment) {
  switch (alignment) {
    case CrossAxisAlignment.start:
      return "flex-start";
    case CrossAxisAlignment.end:
      return "flex-end";
    case CrossAxisAlignment.center:
      return "center";
    case CrossAxisAlignment.stretch:
      return "stretch";
    case CrossAxisAlignment.baseline:
      return "baseline";
  }
}
