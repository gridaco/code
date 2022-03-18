import { StylableJsxWidget } from "@web-builder/core/widget-tree/widget";
import { CSSProperties } from "@coli.codes/css";
import { StylableJSXElementConfig, WidgetKey } from "../..";
import * as css from "@web-builder/styles";
import {
  JSX,
  JSXAttribute,
  JSXClosingElement,
  JSXElement,
  JSXIdentifier,
  JSXOpeningElement,
  JSXSelfClosingElement,
  StringLiteral,
} from "coli";
import { Color, GradientType } from "@reflect-ui/core";
import { Background } from "@reflect-ui/core/lib/background";
import { UnstylableJSXElementConfig } from "..";
import { JsxWidget } from "../../widget-core";

/**
 * A Html input element dedicated to text related inputs.
 */
export class HtmlTextField extends StylableJsxWidget {
  _type = "input/text";

  // the input element can not contain children
  readonly children?: JsxWidget[] = null;

  // keyboardType:

  constructor(p: { key: WidgetKey }) {
    super(p);
  }

  styleData(): CSSProperties {
    return {
      //
    };
  }

  jsxConfig(): StylableJSXElementConfig | UnstylableJSXElementConfig {
    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("input"),
      attributes: [
        new JSXAttribute(
          "type",
          // TODO: support email / password / ...
          new StringLiteral("text")
        ),
      ],
    };
  }
}
