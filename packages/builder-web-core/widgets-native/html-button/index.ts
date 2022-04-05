import type { CSSProperties, ElementCssStyleData } from "@coli.codes/css";
import type { JSXElementConfig, StylableJsxWidget } from "@web-builder/core";
import type {
  IButtonStyleButton,
  IButtonStyleButtonProps,
  ITextStyle,
  ButtonStyle,
  IWHStyleWidget,
  Widget,
} from "@reflect-ui/core";
import { Text } from "@reflect-ui/core";
import { Container } from "..";
import { WidgetKey } from "../../widget-key";
import { JSX } from "coli";
import * as css from "@web-builder/styles";

/**
 * Html5 Button Will have built in support for...
 *
 *
 * - onClick callback
 * - hover styles
 * - focus styles
 * - disabled styles
 * - active styles
 *
 *
 * Learn more at
 * - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
 * - [html spec](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element)
 *
 */
export class HtmlButton extends Container implements IButtonStyleButton {
  _type = "button";

  /**
   * The name of the button, submitted as a pair with the button’s value as part of the form data, when that button is used to submit the form.
   */
  name?: string;

  /**
   * The default behavior of the button. Possible values are:
   * - `submit`: The button submits the form data to the server. This is the default if the attribute is not specified for buttons associated with a <form>, or if the attribute is an empty or invalid value.
   * - `reset`: The button resets all the controls to their initial values, like <input type="reset">. (This behavior tends to annoy users.)
   * - `button`: The button has no default behavior, and does nothing when pressed by default. It can have client-side scripts listen to the element's events, which are triggered when the events occur.
   */
  type: "submit" | "reset" | "button" = "button";

  // #region @ButtonStyleButton
  autofocus?: boolean;
  style: ButtonStyle;
  /**
   * This Boolean attribute prevents the user from interacting with the button: it cannot be pressed or focused.
   */
  disabled?: boolean;
  // TextManifest
  child: Widget;
  // #endregion @ButtonStyleButton

  constructor({
    key,
    name,
    autofocus,
    disabled,
    style,
    child,
    ...rest
  }: { key: WidgetKey } & {
    name?: string;
  } & IButtonStyleButtonProps &
    IWHStyleWidget) {
    super({ key, ...rest });

    // set button properties
    this.name = name;

    this.autofocus = autofocus;
    this.disabled = disabled;
    this.style = style;
    this.child = child;

    //
    this.children = this.makechildren();
  }

  makechildren() {
    if (this.child instanceof Text) {
      return [
        <StylableJsxWidget>{
          key: new WidgetKey(`${this.key.id}.text`, "text"),
          styleData: () => null,
          jsxConfig: () => {
            return <JSXElementConfig>{
              type: "static-tree",
              tree: JSX.text((this.child as Text).data as string),
            };
          },
        },
      ];
    }

    return [];
  }

  styleData(): ElementCssStyleData {
    const containerstyle = super.styleData();

    // wip
    return {
      // general layouts, continer ---------------------
      ...containerstyle,
      // -----------------------------------------------

      // padding
      ...css.padding(this.style.padding?.default),
      "box-sizing": (this.padding && "border-box") || undefined,

      // background
      "background-color": this.style.backgroundColor
        ? css.color(this.style.backgroundColor.default)
        : undefined,

      // text styles --------------------------------------------
      color: css.color((this.style.textStyle.default as ITextStyle)?.color),
      // "text-overflow": this.overflow,
      "font-size": css.px(this.style.textStyle.default.fontSize),
      "font-family": css.fontFamily(this.style.textStyle.default.fontFamily),
      "font-weight": css.convertToCssFontWeight(
        this.style.textStyle.default.fontWeight
      ),
      // "word-spacing": this.style.wordSpacing,
      "letter-spacing": css.letterSpacing(
        this.style.textStyle.default.letterSpacing
      ),
      "line-height": css.length(this.style.textStyle.default.lineHeight),
      // "text-align": this.textAlign,
      "text-decoration": css.textDecoration(
        this.style.textStyle.default.decoration
      ),
      "text-shadow": css.textShadow(this.style.textStyle.default.textShadow),
      "text-transform": css.textTransform(
        this.style.textStyle.default.textTransform
      ),
      // text styles --------------------------------------------

      //
      width: undefined, // clear fixed width
      "min-width": css.length(this.minWidth),
      "min-height": css.length(this.minHeight),

      border: containerstyle["border"] ?? "none",
      outline: containerstyle["outline"] ?? "none",

      // button cursor
      cursor: "pointer",

      ":hover": _button_hover_style,
      ":disabled": _button_disabled_style,
      ":active": _button_active_style,
      ":focus": _button_focus_style,
    };
  }

  // @ts-ignore
  jsxConfig() {
    return <JSXElementConfig>{
      tag: JSX.identifier("button"),
      attributes: [
        // wip
        // TODO: this only works for React. (wont' work for vanilla html)
        // new JSXAttribute(
        //   "onClick",
        //   JSX.exp(
        //     // Snippet.fromStatic()
        //     // TODO: type check
        //     "() => { /* add onclick callback */ }" as any
        //   )
        // ),
      ],
    };
  }
}

const _button_hover_style: CSSProperties = {
  opacity: 0.8,
};

const _button_disabled_style: CSSProperties = {
  opacity: 0.5,
};

const _button_active_style: CSSProperties = {
  opacity: 1,
};

const _button_focus_style: CSSProperties = {};
