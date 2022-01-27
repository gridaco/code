import { CSSProperties } from "@coli.codes/css";
import assert from "assert";
import { JSX, JSXAttribute, StringLiteral } from "coli";
import { JSXElementConfig, StylableJSXElementConfig, WidgetKey } from "../..";
import { image_smallest_fallback_source_base_64 } from "../../k";
import { SelfClosingContainer } from "../container";
import * as css from "@web-builder/styles";
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

  styleData() {
    return <CSSProperties>{
      ...super.styleData(),
      "object-fit": "cover",
      width: css.px(this.width),
      height: css.px(this.height),
      // "max-width": "100%",
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    const attributes = [
      this.src &&
        new JSXAttribute(
          "src",
          new StringLiteral(this.src || image_smallest_fallback_source_base_64)
        ),
      !!!this.alt && new JSXAttribute("alt", new StringLiteral(this.alt)),
    ];

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("img"),
      attributes: attributes,
    };
  }
}
