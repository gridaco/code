import { ReactMultiChildWidget, ReactWidget } from "../../widgets/widget";
import { JSX } from "coli";
import { CSSProperties } from "@coli.codes/css";
import * as css from "@web-builder/styles";
import {
  JSXElementConfig,
  Widget,
  WidgetKey,
} from "@coli.codes/web-builder-core";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { Color, EdgeInsets } from "@reflect-ui/core";
import { color, padding } from "@web-builder/styles";

export class Row extends ReactMultiChildWidget {
  readonly _type = "row";

  margin?: EdgeInsets;
  padding?: EdgeInsets;
  // background: Image | Color

  // indicates the spacing between items
  itemSpacing?: number | undefined;

  constructor({
    key,
    children,
    boxShadow,
    margin,
    padding,
    color,
  }: {
    key: WidgetKey;
    children: Array<ReactWidget>;
    boxShadow?: BoxShadowManifest;
    margin?: EdgeInsets;
    padding?: EdgeInsets;
    color?: Color;
  }) {
    super({
      key: key,
      children: children,
    });

    this.color = color;
    this.margin = margin;
    this.padding = padding;
    this.boxShadow = boxShadow;
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("div"),
    };
  }

  styleData(): CSSProperties {
    return {
      display: "flex",
      "flex-direction": "row",
      "box-shadow": css.boxshadow(this.boxShadow),
      background: color(this.color),
      ...padding(this.padding),
    };
  }
}
