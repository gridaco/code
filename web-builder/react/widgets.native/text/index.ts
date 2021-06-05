import { JSXElementConfig, WidgetKey } from "@coli.codes/web-builder-core";
import { PropertiesHyphen } from "csstype";
import { ReactTextChildWidget } from "../../widgets/widget";
import * as core from "@reflect-ui/core";
import { TextOverflow } from "@reflect-ui/core/lib/text-overflow";
import {
  convertToCssFontWeight,
  CSSProperties,
  makeCssColorValue,
} from "@coli.codes/css";
import { JSX } from "coli";
import { RGBA } from "@reflect-ui/core/lib/color";

export class Text extends ReactTextChildWidget {
  _type: "Text";

  // text properties
  data: string;
  overflow: TextOverflow;
  style: core.ITextStyle;
  alignment: core.TextAlign;

  constructor(p: {
    key: WidgetKey;
    data: string;
    overflow: TextOverflow;
    style: core.ITextStyle;
    alignment: core.TextAlign;
  }) {
    super(p);

    // set text properties
    this.data = p.data;
    this.overflow = p.overflow;
    this.style = p.style;
    this.alignment = p.alignment;
  }

  styleData(): CSSProperties {
    return <CSSProperties>{
      // todo - name conversion not handled properly.
      color: makeCssColorValue((this.style.color as any) as RGBA),
      "text-overflow": this.overflow,
      "font-size": `${this.style.fontSize}px`,
      "font-family": this.style.fontFamily,
      "font-weight": convertToCssFontWeight(this.style.fontWeight),
      "letter-spacing": this.style.letterSpacing,
      "line-height": this.style.lineHeight,
      "word-spacing": this.style.wordSpacing,
      "text-align": this.alignment,
    };
  }

  jsxConfig(): JSXElementConfig {
    return <JSXElementConfig>{
      tag: JSX.identifier("span"),
    };
  }
}
