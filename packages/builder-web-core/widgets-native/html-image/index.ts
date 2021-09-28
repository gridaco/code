import { CSSProperties } from "@coli.codes/css";
import assert from "assert";
import { JSX, JSXAttribute, StringLiteral } from "coli";
import { JSXElementConfig, StylableJSXElementConfig, WidgetKey } from "../..";
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
    return <CSSProperties>{
      ...super.styleData(),
      "object-fit": "cover",
      // "max-width": "100%",
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("img"),
      attributes: [
        this.src && new JSXAttribute("src", new StringLiteral(this.src)),
        this.alt && new JSXAttribute("alt", new StringLiteral(this.alt)),
      ],
    };
  }
}
