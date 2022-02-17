import { JSX } from "coli";
import {
  MultiChildWidget,
  StylableJSXElementConfig,
  StylableJsxWidget,
  WidgetKey,
} from "@web-builder/core";
import * as css from "@web-builder/styles";
import {
  Background,
  BoxShadowManifest,
  Border,
  BorderRadiusManifest,
  Clip,
  DimensionLength,
} from "@reflect-ui/core";
import type { ViewStyle } from "react-native";
import * as styles from "../../rn-styles";

export class Stack extends MultiChildWidget<ViewStyle> {
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
      tag: JSX.identifier("View"),
    };
  }

  styleData(): ViewStyle {
    return {
      // for stacking elements under parent, parent's position shall be relative, children shall be absolute with anchor (e.g. bottom: 0)
      // can it be always relative?
      position: "relative",

      width: css.length(this.width),
      height: css.length(this.height),
      minWidth: css.length(this.minWidth),
      maxWidth: css.length(this.maxWidth),
      minHeight: css.length(this.minHeight),
      maxHeight: css.length(this.maxHeight),

      overflow: clip(this.clipBehavior),
      ...styles.background(this.background),
      ...styles.border(this.border, this.borderRadius),

      // originally, - "box-shadow": css.boxshadow(...(this.boxShadow ?? [])),
      ...(this.boxShadow?.length ? styles.shadow(this.boxShadow[0]) : {}),
    };
  }
}

function clip(clip: Clip): ViewStyle["overflow"] {
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
