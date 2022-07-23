import {
  StylableJSXElementConfig,
  WidgetKey,
  TextDataWidget,
  TextChildWidget,
} from "@web-builder/core";
import * as core from "@reflect-ui/core";
import { TextOverflow, WebTextElement } from "@reflect-ui/core";
import { JSX } from "coli";
import { RGBA } from "@reflect-ui/core";
import * as css from "@web-builder/styles";
import { Dynamic } from "@reflect-ui/core/lib/_utility-types";
import type { TextStyle, ViewStyle } from "react-native";
import * as styles from "../../rn-styles";

export class Text extends TextChildWidget<ViewStyle> {
  _type: "Text";

  // text properties
  data: Dynamic<string>;
  overflow: TextOverflow;
  textStyle: core.ITextStyle;
  textAlign: core.TextAlign;
  width?: number;
  height?: number;

  // experimental
  elementPreference?: WebTextElement;

  constructor(p: {
    key: WidgetKey;
    data: string;
    overflow: TextOverflow;
    textStyle: core.ITextStyle;
    textAlign: core.TextAlign;
    width?: number;
    height?: number;
    elementPreference?: WebTextElement;
  }) {
    super(p);

    // set text properties
    this.data = p.data;
    this.overflow = p.overflow;
    this.textStyle = p.textStyle;
    this.textAlign = p.textAlign;
    this.width = p.width;
    this.height = p.height;

    // experimental
    this.elementPreference = p.elementPreference;
  }

  textData() {
    return new TextDataWidget({
      key: { ...this.key, id: this.key.id + ".text-data" },
      data: this.data,
    });
  }

  styleData(): ViewStyle {
    let textStyle: TextStyle = {
      // text style
      // ------------------------------------------
      color: css.color(this.textStyle.color as any as RGBA),
      // "text-overflow": this.overflow,

      fontSize: this.textStyle.fontSize,
      fontFamily: css.fontFamily(this.textStyle.fontFamily),
      fontWeight: css
        .numericFontWeight(this.textStyle.fontWeight)
        ?.toString() as TextStyle["fontWeight"],
      // FIXME: non numeric value can be passed
      letterSpacing: css.letterSpacing(
        this.textStyle.letterSpacing
      ) as any as number,
      lineHeight: css.length(this.textStyle.lineHeight),
      textAlign: textAlign(this.textAlign),
      ...styles.textDecoration(
        this.textStyle.decoration,
        this.textStyle.decorationStyle
      ),
      ...styles.textShadow(
        this.textStyle.textShadow?.length
          ? this.textStyle.textShadow[0]
          : undefined
      ),
      // ------------------------------------------

      minHeight: this.height,

      // TODO: do not specify width when parent is a flex container.
      // Also flex: 1 is required to make the text wrap.
      width: this.width,
    };

    return <ViewStyle>textStyle;
  }

  jsxConfig(): StylableJSXElementConfig {
    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("Text"),
    };
  }
}

const textAlign = (a: core.TextAlign): TextStyle["textAlign"] => {
  switch (a) {
    case core.TextAlign.left:
      return "left";
    case core.TextAlign.right:
      return "right";
    case core.TextAlign.center:
      return "center";
    case core.TextAlign.justify:
      return "justify";
    case core.TextAlign.start:
      return "left";
    default:
      return undefined;
  }
};
