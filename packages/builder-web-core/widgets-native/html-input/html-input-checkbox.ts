import type { ElementCssStyleData } from "@coli.codes/css";
import type {
  BorderSide,
  Color,
  ICheckboxManifest,
  IWHStyleWidget,
  MouseCursor,
} from "@reflect-ui/core";
import { WidgetKey } from "../../widget-key";
import type { StylableJSXElementConfig } from "../../widget-core";
import { Container } from "../container";
import * as css from "@web-builder/styles";
import { JSX, JSXAttribute, StringLiteral } from "coli";

/**
 * A jsx attibute to indicate input type as checkbox
 */
const attr_type_range = new JSXAttribute("type", new StringLiteral("checkbox"));

/**
 * checkbox
 *
 *
 * @see
 * - [html#progress](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)
 */
export class HtmlInputCheckbox extends Container implements ICheckboxManifest {
  _type = "input/checkbox";

  value?: boolean;

  /**
   * @deprecated - not supported natively
   */
  tristate?: boolean;
  mouseCursor?: MouseCursor;
  activeColor?: Color;
  // fillColor?: ReflectStateProperty<Color>;
  checkColor?: Color;
  focusColor?: Color;

  /**
   * @deprecated - not supported natively
   */
  hoverColor?: Color;
  // overlayColor?: ReflectStateProperty<Color>;

  /**
   * @deprecated - not supported natively
   */
  splashRadius?: number;
  //  visualDensity?: VisualDensity,
  autofocus?: boolean;
  // shape?: OutlinedBorder;

  /**
   * @deprecated - not supported natively
   */
  side?: BorderSide;

  constructor({
    key,

    value,
    tristate,
    mouseCursor,
    activeColor,
    checkColor,
    focusColor,
    hoverColor,
    splashRadius,
    autofocus,
    side,

    ...rest
  }: {
    key: WidgetKey;
  } & IWHStyleWidget &
    ICheckboxManifest) {
    super({ key, ...rest });

    this.value = value;
    this.tristate = tristate;
    this.mouseCursor = mouseCursor;
    this.activeColor = activeColor;
    this.checkColor = checkColor;
    this.focusColor = focusColor;
    this.hoverColor = hoverColor;
    this.splashRadius = splashRadius;
    this.autofocus = autofocus;
    this.side = side;
  }

  get indeterminate() {
    return this.value === undefined;
  }

  styleData(): ElementCssStyleData {
    const containerstyle = super.styleData();

    return {
      // general layouts, continer ---------------------
      ...containerstyle,
      // -------------------------------------------------

      "border-radius": undefined, // clear to use default appearance
      "background-color": undefined, // clear to use default appearance
      padding: undefined,

      // general slider styles
      "accent-color": css.color(this.activeColor),
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    const attrs = [
      attr_type_range,
      this.indeterminate
        ? new JSXAttribute("indeterminate")
        : new JSXAttribute(
            "value",
            new StringLiteral(this.value ? "checked" : "unchecked")
          ),
    ].filter(Boolean);

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("input"),
      attributes: attrs,
    };
  }
}
