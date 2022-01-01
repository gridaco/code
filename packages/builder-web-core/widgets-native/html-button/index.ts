import { JSXElementConfig, WidgetKey } from "@web-builder/core";
import { StylableJsxWidget } from "@web-builder/core/widget-tree/widget";
import { JSX, JSXAttribute, Snippet } from "coli";

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
export class Button extends StylableJsxWidget {
  /**
   * This Boolean attribute prevents the user from interacting with the button: it cannot be pressed or focused.
   */
  disabled?: boolean;

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

  constructor({ key }: { key: WidgetKey }) {
    super({ key });
  }

  children = [
    //
  ];

  styleData() {
    // wip
    return {
      color: "red",
      border: "none",
      outline: "none",
      "min-height": "24px",
      ":hover": _button_hover_style,
      ":disabled": _button_disabled_style,
      ":active": _button_active_style,
      ":focus": _button_focus_style,
    };
  }

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

const _button_hover_style = {
  opacity: 0.8,
};

const _button_disabled_style = {
  opacity: 0.5,
};

const _button_active_style = {
  opacity: 1,
};

const _button_focus_style = {};
