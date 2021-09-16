import { ColiObjectLike } from "@coli.codes/builder";
import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { BorderRadiusManifest } from "@reflect-ui/core";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import {
  borderRadius,
  positionXY,
  background,
  px,
  color,
  boxshadow,
} from "@web-builder/styles";
import { JSX, JSXElementLike, css } from "coli";

import { ReactWidget } from "../../widgets/widget";

export class Container extends ReactWidget {
  _type = "Container";

  children?: ReactWidget[];
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
      color: color(this.color),
      "box-shadow": boxshadow(this.boxShadow),
      background: color(this.color), // FIXME:
      // ...positionXY(this.x, this.y), // FIXME: position shall not be specified when parent has a layout. (e.g. under flex)
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
