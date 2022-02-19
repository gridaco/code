import assert from "assert";
import {
  JSX,
  JSXAttribute,
  JSXExpression,
  StringLiteral,
  TemplateLiteral,
} from "coli";
import {
  StylableJSXElementConfig,
  WidgetKey,
  k,
  UnstylableJSXElementConfig,
} from "@web-builder/core";
import * as css from "@web-builder/styles";
import type { ViewStyle } from "react-native";
import { SelfClosingContainer } from "../rn-widgets";

/**
 * Makes Svg element for react-native with `import { SvgXml } from 'react-native-svg';`
 * 
 * dependency:
 * - [`react-native-svg`](https://github.com/react-native-svg/react-native-svg)
 * 
 * ```tsx
 * // Example
 * import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
  <svg width="32" height="32" viewBox="0 0 32 32">
    <path
      d="M4 0C1.79086 .... 26 14H24Z"
    />
  </svg>
`;

export default () => <SvgXml xml={xml} width="100%" height="100%" />;
 * ```
 */
export class SvgXmlElement extends SelfClosingContainer {
  _type = "rn-svg-xml";
  readonly xml: string;
  width: number;
  height: number;

  constructor({
    key,
    xml,
    width,
    height,
  }: {
    key: WidgetKey;
    xml: string;
    width?: number;
    height?: number;
  }) {
    super({ key });
    assert(xml !== undefined, "SvgXmlElement requires xml data");
    this.xml = xml;
    this.width = width;
    this.height = height;
  }

  styleData(): ViewStyle {
    return {
      ...super.styleData(),
      width: css.px(this.width),
      height: css.px(this.height),
    };
  }

  jsxConfig(): UnstylableJSXElementConfig {
    return <UnstylableJSXElementConfig>{
      type: "static-tree",
      //   // `SvgXml` from `import { SvgXml } from 'react-native-svg';`
      tree: JSX.tag("SvgXml", {
        attributes: [
          new JSXAttribute("width", new StringLiteral("100%")),
          new JSXAttribute("height", new StringLiteral("100%")),
          new JSXAttribute(
            "xml",
            new JSXExpression(new TemplateLiteral(this.xml))
          ),
        ],
      }),
    };
  }
}
