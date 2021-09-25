import { JSXElementConfig, WidgetKey } from "../..";
import {
  TextChildWidget,
  WidgetTree,
} from "@web-builder/core/widget-tree/widget";
import * as core from "@reflect-ui/core";
import { TextOverflow } from "@reflect-ui/core/lib/text-overflow";
import { CSSProperties } from "@coli.codes/css";
import { JSX } from "coli";
import { RGBA } from "@reflect-ui/core/lib/color";
import * as css from "@web-builder/styles";

export class Text extends TextChildWidget {
  _type: "Text";
  children?: WidgetTree[];

  // text properties
  data: string;
  overflow: TextOverflow;
  textStyle: core.ITextStyle;
  alignment: core.TextAlign;
  width?: number;
  height?: number;

  constructor(p: {
    key: WidgetKey;
    data: string;
    overflow: TextOverflow;
    textStyle: core.ITextStyle;
    alignment: core.TextAlign;
    width?: number;
    height?: number;
  }) {
    super(p);

    // set text properties
    this.data = p.data;
    this.overflow = p.overflow;
    this.textStyle = p.textStyle;
    this.alignment = p.alignment;
    this.width = p.width;
    this.height = p.height;
  }

  styleData(): CSSProperties {
    return <CSSProperties>{
      color: css.color((this.textStyle.color as any) as RGBA),
      "text-overflow": this.overflow,
      "font-size": css.px(this.textStyle.fontSize),
      "font-family": this.textStyle.fontFamily,
      "font-weight": css.convertToCssFontWeight(this.textStyle.fontWeight),
      "letter-spacing": this.textStyle.letterSpacing,
      "line-height": this.textStyle.lineHeight,
      "word-spacing": this.textStyle.wordSpacing,
      "text-align": this.alignment,
      "text-decoration": css.textDecoration(this.textStyle.decoration),
      "min-height": css.px(this.height),

      // TODO: do not specify width when parent is a flex container.
      // Also flex: 1 is required to make the text wrap.
      width: css.px(this.width),
    };
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("span"),
    };
  }
}
