import { JSX } from "coli";

import { ReactMultiChildWidget, ReactWidget } from "../../widgets/widget";
import { JSXElementConfig, WidgetKey } from "../../../builder-web-core";
import { CSSProperties } from "@coli.codes/css";
import * as css from "../../../builder-css-styles";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { color } from "@web-builder/styles";
import { Color } from "@reflect-ui/core";
export class Stack extends ReactMultiChildWidget {
  readonly _type = "stack";

  width: number;
  height: number;

  constructor(p: {
    key: WidgetKey;
    children: Array<ReactWidget>;
    width: number;
    height: number;
    boxShadow?: BoxShadowManifest;
    color?: Color;
  }) {
    super(p);
    this.color = p.color;
    this.width = p.width;
    this.height = p.height;
    this.boxShadow = p.boxShadow;
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("div"),
    };
  }

  // ------------------------------------------------------
  private __minHeight: number;
  /**
   * TODO: min height is set because positioned under stack requires parent (this) to have a height.
   * @param h
   * @returns
   */
  __tmp_set_explicit_min_height(h: number): this {
    this.__minHeight = h;
    return this;
  }
  // ------------------------------------------------------

  styleData(): CSSProperties {
    return {
      width: css.px(this.width),
      height: css.px(this.height),

      "min-height": css.px(this.__minHeight),
      "background-color": color(this.color),
      // for stacking elements under parent, parent's position shall be relative, children shall be absolute with anchor (e.g. bottom: 0)
      // can it be always relative?
      position: "relative",
      "box-shadow": css.boxshadow(this.boxShadow),
    };
  }
}
