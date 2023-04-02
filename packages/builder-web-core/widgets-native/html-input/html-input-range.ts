import type { CSSProperties, ElementCssStyleData } from "@coli.codes/css";
import type {
  Color,
  ISliderManifest,
  IWHStyleWidget,
  SystemMouseCursors,
} from "@reflect-ui/core";
import type { StylableJSXElementConfig } from "../../widget-core";
import { WidgetKey } from "../../widget-key";
import { Container } from "../container";
import { JSX, JSXAttribute, StringLiteral } from "coli";
import * as css from "@web-builder/styles";
import { RoundSliderThumbShape } from "@reflect-ui/core";

/**
 * A jsx attibute to indicate input type as range
 */
const attr_type_range = new JSXAttribute("type", new StringLiteral("range"));

/**
 * A html native input as a slider wit type="slider"
 */
export class HtmlInputRange extends Container implements ISliderManifest {
  _type = "input/range";

  // #region ISliderManifest
  activeColor?: Color;
  autoFocus: boolean;
  divisions: number;
  inactiveColor?: Color;
  max: number;
  min: number;
  mouseCursor?: SystemMouseCursors;
  thumbColor?: Color;
  thumbShape?: RoundSliderThumbShape;
  initialValue: number;
  // #endregion ISliderManifest

  constructor({
    key,

    activeColor,
    autoFocus,
    divisions,
    inactiveColor,
    max,
    min,
    mouseCursor,
    thumbColor,
    thumbShape,
    initialValue,

    ...rest
  }: {
    key: WidgetKey;
  } & ISliderManifest &
    IWHStyleWidget) {
    super({ key, ...rest });

    this.activeColor = activeColor;
    this.autoFocus = autoFocus;
    this.divisions = divisions;
    this.inactiveColor = inactiveColor;
    this.max = max;
    this.min = min;
    this.mouseCursor = mouseCursor;
    this.thumbColor = thumbColor;
    this.thumbShape = thumbShape;
    this.initialValue = initialValue;
  }

  styleData(): ElementCssStyleData {
    const containerstyle = super.styleData();

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
      // "background-color": ,
      ...css.background(this.background),
      color: css.color(this.activeColor),
      // outline: "none",

      opacity: 0.7,
      /* 0.2 seconds transition on hover */
      "-webkit-transition": ".2s",
      transition: "opacity .2s",

      // ----------------------

      // thumb (knob) --------------------------------
      "::-webkit-slider-thumb": this.thumbShape
        ? thumbstyle({
            ...this.thumbShape,
            color: this.thumbColor,
            platform: "webkit",
          })
        : undefined,
      "::-moz-range-thumb": this.thumbShape
        ? thumbstyle({
            ...this.thumbShape,
            color: this.thumbColor,
            platform: "moz",
          })
        : undefined,
      // only works on firefox (also consider using "::-webkit-slider-runnable-track")
      "::-moz-range-progress": {
        "background-color": css.color(this.activeColor),
        height: "100%",
      },
      // ---------------------------------------------

      ":hover": {
        /* Fully shown on mouse-over */
        opacity: 1,
      },
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    const attrs = [
      attr_type_range,
      this.autoFocus && new JSXAttribute("autofocus", new StringLiteral("on")),
      // TODO: below attributes
      // this.disabled && new JSXAttribute("disabled"),
      // this.readOnly && new JSXAttribute("readonly"),
      this.initialValue &&
        new JSXAttribute(
          "value",
          new StringLiteral(this.initialValue.toString())
        ),
      this.divisions &&
        new JSXAttribute("step", new StringLiteral(this.divisions.toString())),
      this.min &&
        new JSXAttribute("min", new StringLiteral(this.min.toString())),
      this.max &&
        new JSXAttribute("max", new StringLiteral(this.max.toString())),
    ].filter(Boolean);

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("input"),
      attributes: attrs,
    };
  }

  get finalStyle() {
    const superstyl = super.finalStyle;

    // width override. ------------------------------------------------------------------------------------------
    // input element's width needs to be specified if the position is absolute and the left & right is specified.
    let width = superstyl.width;
    if (
      width === undefined &&
      superstyl.position === "absolute" &&
      superstyl.left !== undefined &&
      superstyl.right !== undefined
    ) {
      width = "calc(100% - " + superstyl.left + " - " + superstyl.right + ")";
    }
    // ----------------------------------------------------------------------------------------------------------

    return {
      ...superstyl,
      width,
    };
  }
}

export class HtmlSlider extends HtmlInputRange {}

function thumbstyle({
  enabledThumbRadius,
  color,
  platform,
}: RoundSliderThumbShape & {
  platform: "moz" | "webkit";
} & {
  color: Color;
}): CSSProperties {
  const base: CSSProperties = <CSSProperties>{
    width: css.px(enabledThumbRadius),
    height: css.px(enabledThumbRadius),
    "border-radius": "50%",
    "background-color": css.color(color),
    // ..._aberation_support_progress_fill_dirty({ color: activeColor }),
    cursor: "pointer" /* Cursor on hover */,
  };
  switch (platform) {
    case "moz": {
      // no overrides
      return base;
    }
    case "webkit": {
      return {
        "-webkit-appearance": "none" /* Override default look */,
        appearance: "none",
        ...base,
      };
    }
  }

  return base;
}

/**
 * There are no proper way to handle the progress color in Chome, Safari.
 * Moz supports the `-moz-range-progress`, `-moz-range-track`, but this is [not standard](https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-range-progress)
 *
 * We use this trick instead.
 * https://codepen.io/okayoon/pen/PMpmjp
 *
 * this only works with overflow: hidden, so we cannot show overflowing round thumb.
 *
 * we can also do it by using linear-gradient, [but this can't be done only by using css](https://codepen.io/duplich/pen/qjYQEZ).
 *
 * @returns
 */
function _aberation_support_progress_fill_dirty({ color }: { color: Color }) {
  if (color === undefined) {
    return;
  }
  return {
    "box-shadow": `-100vw 0 0 100vw ${css.color(color)}`,
  };
}
