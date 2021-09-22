import assert from "assert";
import { JSX, JSXAttribute, StringLiteral } from "coli";
import { JSXElementConfig, WidgetKey } from "../../../builder-web-core";
import { SelfClosingContainer } from "../container";

export class ImageElement extends SelfClosingContainer {
  _type = "img";
  readonly src: string;
  readonly alt: string;
  constructor({
    key,
    src,
    alt,
  }: {
    key: WidgetKey;
    src: string;
    alt?: string;
  }) {
    super({ key });
    assert(src !== undefined, "ImageElement requires src");
    this.src = src;
    this.alt = alt || `image of ${key.name}`;
  }

  styleData() {
    return super.styleData();
  }

  jsxConfig() {
    return <JSXElementConfig>{
      tag: JSX.identifier("img"),
      attributes: [
        this.src && new JSXAttribute("src", new StringLiteral(this.src)),
        this.alt && new JSXAttribute("alt", new StringLiteral(this.alt)),
      ],
    };
  }
}
