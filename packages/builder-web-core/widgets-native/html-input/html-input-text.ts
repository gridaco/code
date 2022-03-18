import { StylableJsxWidget } from "@web-builder/core/widget-tree/widget";
import { CSSProperties } from "@coli.codes/css";
import { StylableJSXElementConfig, WidgetKey } from "../..";
import * as css from "@web-builder/styles";
import { JSX, JSXAttribute, StringLiteral } from "coli";
import { UnstylableJSXElementConfig } from "..";
import { JsxWidget } from "../../widget-core";
import {
  Color,
  EdgeInsets,
  ITextFieldManifest,
  TextAlign,
  TextAlignVertical,
  TextFieldDecoration,
  TextStyle,
} from "@reflect-ui/core";
import { SystemMouseCursors } from "@reflect-ui/core/lib/mouse-cursor";
import { TextInputType } from "@reflect-ui/core/lib/text-input-type";

/**
 * A Html input element dedicated to text related inputs.
 */
export class HtmlInputText
  extends StylableJsxWidget
  implements ITextFieldManifest
{
  _type = "input/text";

  // the input element can not contain children
  readonly children?: JsxWidget[] = null;

  decoration?: TextFieldDecoration;
  autocorrect?: boolean;
  autofocus?: boolean;
  autofillHints?: string[];
  cursorColor?: Color;
  cursorHeight?: number;
  cursorRadius?: number;
  cursorWidth?: number;
  disabled?: boolean;
  enableSuggestions?: boolean;
  keyboardAppearance?: "light" | "dark";
  keyboardType?: TextInputType;
  maxLines?: number;
  minLines?: number;
  mouseCursor?: SystemMouseCursors;
  obscureText?: boolean;
  obscuringCharacter?: string;
  readOnly?: boolean;
  restorationId?: string;
  scrollPadding?: EdgeInsets;
  showCursor?: boolean;
  style: TextStyle;
  textAlign?: TextAlign;
  textAlignVertical?: TextAlignVertical;
  initialValue?: string;

  constructor({
    key,

    decoration,
    autocorrect,
    autofocus,
    autofillHints,
    cursorColor,
    cursorHeight,
    cursorRadius,
    cursorWidth,
    disabled,
    enableSuggestions,
    keyboardAppearance,
    keyboardType,
    maxLines,
    minLines,
    mouseCursor,
    obscureText,
    obscuringCharacter,
    readOnly,
    restorationId,
    scrollPadding,
    showCursor,
    style,
    textAlign,
    textAlignVertical,
    initialValue,
  }: { key: WidgetKey } & ITextFieldManifest) {
    super({ key });

    this.decoration = decoration;
    this.autocorrect = autocorrect;
    this.autofocus = autofocus;
    this.autofillHints = autofillHints;
    this.cursorColor = cursorColor;
    this.cursorHeight = cursorHeight;
    this.cursorRadius = cursorRadius;
    this.cursorWidth = cursorWidth;
    this.disabled = disabled;
    this.enableSuggestions = enableSuggestions;
    this.keyboardAppearance = keyboardAppearance;
    this.keyboardType = keyboardType;
    this.maxLines = maxLines;
    this.minLines = minLines;
    this.mouseCursor = mouseCursor;
    this.obscureText = obscureText;
    this.obscuringCharacter = obscuringCharacter;
    this.readOnly = readOnly;
    this.restorationId = restorationId;
    this.scrollPadding = scrollPadding;
    this.showCursor = showCursor;
    this.style = style;
    this.textAlign = textAlign;
    this.textAlignVertical = textAlignVertical;
    this.initialValue = initialValue;
  }

  styleData(): CSSProperties {
    // TODO:
    // - support placeholder text color styling

    return {
      // padding
      ...css.padding(this.decoration.contentPadding),
      // border
      border:
        this.decoration.border.borderSide &&
        css.borderSide(this.decoration.border?.borderSide),
      ...(("borderRadius" in this.decoration.border &&
        css.borderRadius(this.decoration.border["borderRadius"])) ??
        {}),
      // background
      "background-color": this.decoration.filled
        ? css.color(this.decoration.fillColor)
        : undefined,

      // text styles --------------------------------------------
      color: css.color(this.style.color),
      // "text-overflow": this.overflow,
      "font-size": css.px(this.style.fontSize),
      "font-family": css.fontFamily(this.style.fontFamily),
      "font-weight": css.convertToCssFontWeight(this.style.fontWeight),
      // "word-spacing": this.style.wordSpacing,
      "letter-spacing": css.letterSpacing(this.style.letterSpacing),
      "line-height": css.length(this.style.lineHeight),
      "text-align": this.textAlign,
      "text-decoration": css.textDecoration(this.style.decoration),
      "text-shadow": css.textShadow(this.style.textShadow),
      "text-transform": this.style.textTransform,
      // text styles --------------------------------------------
    };
  }

  jsxConfig(): StylableJSXElementConfig | UnstylableJSXElementConfig {
    const attrs = [
      new JSXAttribute(
        "type",
        new StringLiteral(inputtype(this.keyboardType, this.obscureText))
      ),
      this.autofocus && new JSXAttribute("autofocus", new StringLiteral("on")),
      this.autofillHints?.length >= 1 &&
        new JSXAttribute(
          "autocomplete",
          new StringLiteral(this.autofillHints.join(" "))
        ),
      this.disabled && new JSXAttribute("disabled"),
      this.initialValue &&
        new JSXAttribute("value", new StringLiteral(this.initialValue)),
      this.decoration.placeholderText &&
        new JSXAttribute(
          "placeholder",
          new StringLiteral(this.decoration.placeholderText)
        ),
      this.readOnly && new JSXAttribute("readonly"),
    ].filter(Boolean);

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("input"),
      attributes: attrs,
    };
  }
}

/**
 * Text input with additional state styles
 */
export class HtmlTextField extends HtmlInputText {}

const inputtype = (t: TextInputType, isPassword?: boolean) => {
  if (isPassword) {
    return "password";
  }

  switch (t) {
    case TextInputType.datetime:
      return "datetime-local";
    case TextInputType.emailAddress:
      return "email";
    case TextInputType.none:
      return;
    case TextInputType.number:
      return "number";
    case TextInputType.phone:
      return "tel";
    case TextInputType.url:
      return "url";
    case TextInputType.visiblePassword:
      return "password";
    // case TextInputType.search:
    //   return "search";
    case TextInputType.text:
    case TextInputType.name:
    case TextInputType.streetAddress:
    case TextInputType.multiline:
    default:
      return "text";
  }
};
