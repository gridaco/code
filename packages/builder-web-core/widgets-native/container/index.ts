import { keyframes } from "@emotion/react";
import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "../..";
import { BorderRadiusManifest } from "@reflect-ui/core";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import * as css from "@web-builder/styles";
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
    opacity?: number;
  }) {
    super(p);
    this.borderRadius = p.borderRadius;
  }

  styleData(): CSSProperties {
    return {
      width: css.px(this.width),
      height: css.px(this.height),
      "box-shadow": css.boxshadow(this.boxShadow),
      // FIXME: bg should be handled by the background paint, which is not ready from tokenizer.
      "background-color": css.color(this.color),
      // color: color(this.color), // color is for text
      ...css.borderRadius(this.borderRadius),
      opacity: css.opacity(this.opacity),
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
