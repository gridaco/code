import { CSSProperties } from "@coli.codes/css";
import { StylableJSXElementConfig, WidgetKey } from "../..";
import {
  Border,
  BorderRadiusManifest,
  BoxShadowManifest,
  DimensionLength,
  EdgeInsets,
} from "@reflect-ui/core";
import { Background } from "@reflect-ui/core/lib/background";
import * as css from "@web-builder/styles";
import { JSX } from "coli";
import { StylableJsxWidget } from "@web-builder/core/widget-tree/widget";

export class Container extends StylableJsxWidget {
  _type = "Container";

  children?: StylableJsxWidget[];
  borderRadius?: BorderRadiusManifest;
  border?: Border;
  margin?: EdgeInsets;

  constructor(p: {
    key: WidgetKey;
    x?: number;
    y?: number;

    width?: DimensionLength;
    height?: DimensionLength;
    minWidth?: DimensionLength;
    maxWidth?: DimensionLength;
    minHeight?: DimensionLength;
    maxHeight?: DimensionLength;

    margin?: EdgeInsets;

    background?: Background;
    borderRadius?: BorderRadiusManifest;
    boxShadow?: BoxShadowManifest[];
    border?: Border;
  }) {
    super(p);

    this.width = p.width;
    this.height = p.height;
    this.minWidth = p.minWidth;
    this.maxWidth = p.maxWidth;
    this.minHeight = p.minHeight;
    this.maxHeight = p.maxHeight;

    this.margin = p.margin;

    this.x = p.x;
    this.y = p.y;
    this.background = p.background;
    this.borderRadius = p.borderRadius;
    this.boxShadow = p.boxShadow;
    this.border = p.border;
  }

  styleData(): CSSProperties {
    return {
      width: css.length(this.width),
      height: css.length(this.height),
      "min-width": css.length(this.minWidth),
      "max-width": css.length(this.maxWidth),
      "min-height": css.length(this.minHeight),
      "max-height": css.length(this.maxHeight),
      ...css.margin(this.margin),
      "box-shadow": css.boxshadow(...(this.boxShadow ?? [])),
      ...css.background(this.background),
      ...css.border(this.border),
      ...css.borderRadius(this.borderRadius),
    };
  }
  jsxConfig(): StylableJSXElementConfig {
    return {
      type: "tag-and-attr",
      tag: JSX.identifier("div"),
    };
  }
}

export abstract class SelfClosingContainer
  extends Container
  implements Omit<Container, "children">
{
  readonly children?: undefined;
}
