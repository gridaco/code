import { JSX } from "coli";

import { MultiChildWidget, WidgetTree } from "@web-builder/core";
import { JSXElementConfig, WidgetKey } from "../..";
import { CSSProperties } from "@coli.codes/css";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import * as css from "@web-builder/styles";
import { Color } from "@reflect-ui/core";

export class Stack extends MultiChildWidget {
  readonly _type = "stack";

  width: number;
  height: number;

  constructor(p: {
    key: WidgetKey;
    children: Array<WidgetTree>;
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
      "background-color": css.color(this.color),
      // for stacking elements under parent, parent's position shall be relative, children shall be absolute with anchor (e.g. bottom: 0)
      // can it be always relative?
      position: "relative",
      "box-shadow": css.boxshadow(this.boxShadow),
    };
  }
}
