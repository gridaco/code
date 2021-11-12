import { CSSProperties } from "@coli.codes/css";
import { StylableJSXElementConfig, WidgetKey } from "../..";
import {
  Border,
  BorderRadiusManifest,
  BoxShadowManifest,
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

  constructor(p: {
    key: WidgetKey;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    background?: Background;
    borderRadius?: BorderRadiusManifest;
    boxShadow?: BoxShadowManifest[];
    border?: Border;
  }) {
    super(p);
    this.width = p.width;
    this.height = p.height;
    this.x = p.x;
    this.y = p.y;
    this.background = p.background;
    this.borderRadius = p.borderRadius;
    this.boxShadow = p.boxShadow;
    this.border = p.border;
  }

  styleData(): CSSProperties {
    return {
      width: css.px(this.width),
      height: css.px(this.height),
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
  implements Omit<Container, "children"> {
  readonly children?: undefined;
}
