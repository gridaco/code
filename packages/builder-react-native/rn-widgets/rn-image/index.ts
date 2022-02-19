import assert from "assert";
import {
  Identifier,
  JSX,
  JSXAttribute,
  JSXExpression,
  ObjectLiteralExpression,
  PropertyAssignment,
  StringLiteral,
} from "coli";
import { StylableJSXElementConfig, WidgetKey, k } from "@web-builder/core";
import * as css from "@web-builder/styles";
import { SelfClosingContainer } from "../rn-container";
import type { ViewStyle } from "react-native";

export class ImageElement extends SelfClosingContainer {
  _type = "img";
  readonly src: string;
  readonly alt: string;
  width: number;
  height: number;

  constructor({
    key,
    src,
    alt,
    width,
    height,
  }: {
    key: WidgetKey;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  }) {
    super({ key });
    assert(src !== undefined, "ImageElement requires src");
    this.src = src;
    this.alt = alt;
    this.width = width;
    this.height = height;
  }

  styleData(): ViewStyle {
    return {
      ...super.styleData(),
      width: css.px(this.width),
      height: css.px(this.height),
      // "max-width": "100%",

      // TODO: object-fit eq for RN
      // "object-fit": "cover",
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    const attributes = [
      this.src &&
        new JSXAttribute(
          "src",
          new JSXExpression(
            new ObjectLiteralExpression({
              properties: [
                new PropertyAssignment({
                  name: new Identifier("uri"),
                  initializer: new StringLiteral(
                    this.src || k.image_smallest_fallback_source_base_64
                  ),
                }),
              ],
            })
          )
        ),
      // there is no "alt" attribute in the react-native "Image" tag
      // typeof this.alt === "string" &&
      //   new JSXAttribute("alt", new StringLiteral(this.alt)),
    ];

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("Image"),
      attributes: attributes,
    };
  }
}
