import { CSSProperties, CSSProperty } from "@coli.codes/css";
import { WidgetKey } from "@coli.codes/web-builder-core";
import {
  Axis,
  CrossAxisAlignment,
  EdgeInsets,
  MainAxisAlignment,
  VerticalDirection,
} from "@reflect-ui/core";
import { MainAxisSize } from "@reflect-ui/core/lib/main-axis-size";
import { JSX, JSXElementLike } from "coli";
import { ReactMultiChildWidget, ReactWidget } from "../../widgets/widget";
import * as css from "@web-builder/styles";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";
import { px } from "@web-builder/styles";

export class Flex extends ReactMultiChildWidget {
  readonly _type: "row" | "column";

  mainAxisAlignment?: MainAxisAlignment;
  mainAxisSize?: MainAxisSize;
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: VerticalDirection;
  margin?: EdgeInsets;
  padding?: EdgeInsets;
  background?: BackgroundPaintLike[];
  // indicates the spacing between items
  itemSpacing?: number;
  flex?: number;

  readonly direction: Axis;

  // css only properties
  readonly overflow?: CSSProperty.Overflow;

  constructor(
    p: IFlexManifest<ReactWidget> & {
      // direction: "row" | "column";
      key: WidgetKey;
      width?: number;
      height?: number;
      mainAxisAlignment?: MainAxisAlignment;
      mainAxisSize?: MainAxisSize;
      crossAxisAlignment?: CrossAxisAlignment;
      verticalDirection?: VerticalDirection;
      margin?: EdgeInsets;
      padding?: EdgeInsets;
      background?: BackgroundPaintLike[];
      overflow?: CSSProperty.Overflow;
    }
  ) {
    super(p);
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

    // css only
    this.overflow = p.overflow;
  }

  jsxConfig() {
    return {
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      display: "flex",
      ...css.justifyContent(this.mainAxisAlignment),
      "flex-direction": direction(this.direction),
      "align-items": this.crossAxisAlignment,
      overflow: this.overflow,
      flex: this.flex,
      gap: this.itemSpacing && px(this.itemSpacing),
      "box-shadow": css.boxshadow(this.boxShadow),
      ...sizing({ ...this }),
      ...css.background(this.background),
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

function sizing({
  mainAxisSize,
  width,
  height,
  flex,
}: {
  mainAxisSize?: MainAxisSize;
  width?: number;
  height?: number;
  flex?: number;
}): CSSProperties {
  if (mainAxisSize === MainAxisSize.max) {
    return <CSSProperties>{
      "align-self": "stretch",
      flex: "1", // This is a temporary solution, since stretch can be used on non-space-between parent, but still the item should stretch, we use flex 1 to do this.
    };
  }
  // TODO:
  // 1. add widht / height handling
}
