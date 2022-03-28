import type { ElementCssStyleData } from "@coli.codes/css";
import type { Color, IWHStyleWidget } from "@reflect-ui/core";
import { WidgetKey } from "../../widget-key";
import type { StylableJSXElementConfig } from "../../widget-core";
import { Container } from "../container";
import * as css from "@web-builder/styles";
import { IProgressIndicatorProps } from "@reflect-ui/core";
import { JSX, JSXAttribute, StringLiteral } from "coli";

/**
 * <progress>
 *
 *
 * @see
 * - [html#progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)
 */
export class Progress extends Container implements IProgressIndicatorProps {
  _type = "progress";

  value?: number;
  backgroundColor?: Color;
  color?: Color;
  minHeight?: number;
  semanticsLabel?: string;

  constructor({
    key,

    value,
    backgroundColor,
    color,
    minHeight,
    semanticsLabel,

    ...rest
  }: {
    key: WidgetKey;
  } & IProgressIndicatorProps &
    IWHStyleWidget) {
    super({ key, ...rest });

    this.value = value;
    this.backgroundColor = backgroundColor;
    this.color = color;
    this.minHeight = minHeight;
    this.semanticsLabel = semanticsLabel;
  }

  get indeterminate() {
    return this.value <= 0;
  }

  styleData(): ElementCssStyleData {
    const containerstyle = super.styleData();

    if (this.indeterminate) {
      return {
        // general layouts, continer ---------------------
        ...containerstyle,
        // -------------------------------------------------

        "border-radius": undefined, // clear to use default appearance
        "background-color": undefined, // clear to use default appearance

        // general slider styles
        "accent-color": css.color(this.color),
      };
    }

    // TODO: add styling
    return {
      // general layouts, continer ---------------------
      ...containerstyle,
      // -------------------------------------------------

      /* Override default CSS styles */
      "-webkit-appearance": "none",
      appearance: "none",
      /* --------------------------- */

      // general slider styles
      "accent-color": css.color(this.color),

      "::-webkit-progress-bar": {
        "background-color": css.color(this.backgroundColor),
        ...css.borderRadius(this.borderRadius),
      },

      "::-webkit-progress-value": {
        "background-color": css.color(this.color),
        ...css.borderRadius(this.borderRadius),
      },

      // ----------------------
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    const attrs = [
      this.indeterminate
        ? undefined
        : new JSXAttribute("value", new StringLiteral(this.value.toString())),
      // this.min &&
      //   new JSXAttribute("min", new StringLiteral(this.min.toString())),
      // this.max &&
      //   new JSXAttribute("max", new StringLiteral(this.max.toString())),
    ].filter(Boolean);

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("progress"),
      attributes: attrs,
    };
  }
}
