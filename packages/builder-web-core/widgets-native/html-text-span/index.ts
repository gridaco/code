import { JSXElementConfig, StylableJSXElementConfig, WidgetKey } from "../..";
import { TextChildWidget, WidgetTree } from "@web-builder/core";
import * as core from "@reflect-ui/core";
import { TextOverflow } from "@reflect-ui/core";
import { CSSProperties } from "@coli.codes/css";
import { JSX } from "coli";
import { RGBA } from "@reflect-ui/core";
import * as css from "@web-builder/styles";

export class Text extends TextChildWidget {
  _type: "Text";
  children?: WidgetTree[];

  // text properties
  data: string;
  overflow: TextOverflow;
  textStyle: core.ITextStyle;
  textAlign: core.TextAlign;
  width?: number;
  height?: number;

  constructor(p: {
    key: WidgetKey;
    data: string;
    overflow: TextOverflow;
    textStyle: core.ITextStyle;
    textAlign: core.TextAlign;
    width?: number;
    height?: number;
  }) {
    super(p);

    // set text properties
    this.data = p.data;
    this.overflow = p.overflow;
    this.textStyle = p.textStyle;
    this.textAlign = p.textAlign;
    this.width = p.width;
    this.height = p.height;
  }

  styleData(): CSSProperties {
    let textStyle: any = {
      // text style
      // ------------------------------------------
      color: css.color((this.textStyle.color as any) as RGBA),
      "text-overflow": this.overflow,
      "font-size": css.px(this.textStyle.fontSize),
      "font-family": css.fontFamily(this.textStyle.fontFamily),
      "font-weight": css.convertToCssFontWeight(this.textStyle.fontWeight),
      "letter-spacing": css.length(this.textStyle.letterSpacing),
      "word-spacing": this.textStyle.wordSpacing,
      "text-align": this.textAlign,
      "text-decoration": css.textDecoration(this.textStyle.decoration),
      // ------------------------------------------
      "min-height": css.px(this.height),
      // TODO: do not specify width when parent is a flex container.
      // Also flex: 1 is required to make the text wrap.
      width: css.px(this.width),
    };

    // Not specified in case of auto
    if (!!this.textStyle.lineHeight) {
      textStyle = {
        ...textStyle,
        "line-height": css.length(this.textStyle.lineHeight),
      };
    }

    return <CSSProperties>textStyle;
  }

  jsxConfig(): StylableJSXElementConfig {
    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("span"),
    };
  }
}
