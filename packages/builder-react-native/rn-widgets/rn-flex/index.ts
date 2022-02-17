import { JSX } from "coli";
import {
  Axis,
  Border,
  BorderRadiusManifest,
  BoxShadowManifest,
  CrossAxisAlignment,
  DimensionLength,
  EdgeInsets,
  MainAxisAlignment,
  MainAxisSize,
  VerticalDirection,
  IFlexManifest,
  Background,
} from "@reflect-ui/core";
import {
  MultiChildWidget,
  StylableJsxWidget,
  StylableJSXElementConfig,
  WidgetKey,
} from "@web-builder/core";
import type { ViewStyle, FlexAlignType } from "react-native";
import * as css from "@web-builder/styles";
import { tricks } from "@web-builder/styles";
import * as styles from "../../rn-styles";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

/**
 * A Flex type conpat for react-native View
 */
export class Flex extends MultiChildWidget<ViewStyle> {
  readonly _type: "row" | "column";

  mainAxisAlignment?: MainAxisAlignment;
  mainAxisSize?: MainAxisSize;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
  margin?: EdgeInsets;
  padding?: EdgeInsets;
  itemSpacing?: number;
  flex?: number;

  readonly direction: Axis;

  // css only properties
  readonly overflow?: ViewStyle["overflow"];

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
      overflow?: ViewStyle["overflow"];
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
    this.flexWrap = p.flexWrap;
  }

  jsxConfig(): StylableJSXElementConfig {
    return {
      type: "tag-and-attr",
      tag: JSX.identifier("View"),
    };
  }

  styleData(): ViewStyle {
    return {
      display: "flex",
      justifyContent: css.mainAxisAlignmentToJustifyContent(
        this.mainAxisAlignment
      ),
      flexDirection: direction(this.direction),
      alignItems: alignitems(this.crossAxisAlignment),
      flex: this.flex,
      flexWrap: this.flexWrap,
      overflow: this.overflow,

      // TODO: add item spacing support ( follow the flutter way )
      // gap: this.itemSpacing && css.px(this.itemSpacing),

      // originally, - "box-shadow": css.boxshadow(...(this.boxShadow ?? [])),
      ...(this.boxShadow?.length ? styles.shadow(this.boxShadow[0]) : {}),
      ...styles.border(this.border, this.borderRadius),

      ...flexsizing({ ...this }),
      minWidth: css.length(this.minWidth),
      maxWidth: css.length(this.maxWidth),
      minHeight: css.length(this.minHeight),
      maxHeight: css.length(this.maxHeight),
      ...styles.background(this.background),
      ...styles.padding(this.padding),

      // do we need this on react-native?
      // "box-sizing": (this.padding && "border-box") || undefined,
    };
  }
}

function flexsizing(p: {
  direction: Axis;
  mainAxisSize?: MainAxisSize;
  width?: DimensionLength;
  height?: DimensionLength;
  flex?: number;
}): {
  flex?: ViewStyle["flex"];
  alignSelf?: ViewStyle["alignSelf"];
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
} {
  const sizing = tricks.flexsizing(p);
  return {
    flex: typeof sizing.flex == "number" ? sizing.flex : undefined,
    alignSelf: sizing["align-self"],
    width: sizing.width,
    height: sizing.height,
  };
}

function alignitems(al: CrossAxisAlignment): FlexAlignType {
  switch (al) {
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
    default:
      return "flex-start";
  }
}

function direction(
  axis: Axis
): "row" | "column" | "row-reverse" | "column-reverse" {
  switch (axis) {
    case Axis.horizontal:
      return "row";
    case Axis.vertical:
      return "column";
  }
  throw `axis value of "${axis}" is not a valid reflect Axis value.`;
}
