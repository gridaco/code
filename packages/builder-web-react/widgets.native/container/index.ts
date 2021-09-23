import { ColiObjectLike } from "@coli.codes/builder";
import { CSSProperties } from "@coli.codes/css";
import { JSXElementConfig, WidgetKey } from "../../../builder-web-core";
import { BorderRadiusManifest } from "@reflect-ui/core";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import {
  borderRadius,
  positionAbsolute,
  background,
  px,
  color,
  boxshadow,
} from "../../../builder-css-styles";
import { JSX, JSXElementLike, css } from "coli";

import { ReactWidget } from "../../widgets/widget";

export class Container extends ReactWidget {
  _type = "Container";

  children?: ReactWidget[];
  borderRadius?: BorderRadiusManifest;
  constraint?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };

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
      /**
       * // FIXME: position shall not be specified when parent has a layout. (e.g. under flex)
       */
      ...((this.constraint && positionAbsolute(this.constraint)) || {}),
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
