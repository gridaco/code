import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "../..";
import { BorderRadiusManifest } from "@reflect-ui/core";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import {
  borderRadius,
  positionAbsolute,
  background,
  px,
  color,
  boxshadow,
} from "@web-builder/styles";
import { JSX } from "coli";

import { WidgetTree } from "@web-builder/core/widget-tree/widget";

export class Container extends WidgetTree {
  _type = "Container";

  children?: WidgetTree[];
  borderRadius?: BorderRadiusManifest;

  constructor(p: {
    key: WidgetKey;
    background?: BackgroundPaintLike[];
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    borderRadius?: BorderRadiusManifest;
  }) {
    super(p);
    this.borderRadius = p.borderRadius;
  }

  styleData(): CSSProperties {
    return {
      width: px(this.width),
      height: px(this.height),
      "box-shadow": boxshadow(this.boxShadow),
      color: color(this.color),
      // FIXME: bg should be handled by the background paint, which is not ready from tokenizer.
      background: color(this.color),
      ...borderRadius(this.borderRadius),
      ...background(this.background),
    };
  }
  jsxConfig(): JSXElementConfig {
    return {
      tag: JSX.identifier("div"),
    };
  }
}

export abstract class SelfClosingContainer
  extends Container
  implements Omit<Container, "children"> {
  readonly children?: undefined;
}
