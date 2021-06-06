import { ReactMultiChildWidget, ReactWidget } from "../../widgets/widget";
import { JSX, JSXElementLike, css } from "coli";
import { boxshadow, CSSProperties, px } from "@coli.codes/css";
import {
  JSXElementConfig,
  Widget,
  WidgetKey,
} from "@coli.codes/web-builder-core";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { EdgeInsets } from "@reflect-ui/core";
import { padding } from "@web-builder/styles";

export class Row extends ReactMultiChildWidget {
  readonly _type = "row";

  margin?: EdgeInsets;
  padding?: EdgeInsets;
  // background: Image | Color

  constructor({
    key,
    children,
    boxShadow,
    margin,
    padding,
  }: {
    key: WidgetKey;
    children: Array<ReactWidget>;
    boxShadow?: BoxShadowManifest;
    margin?: EdgeInsets;
    padding?: EdgeInsets;
  }) {
    super({
      key: key,
      children: children,
    });

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
      "box-shadow": boxshadow(this.boxShadow),
      ...padding(this.padding),
    };
  }
}
