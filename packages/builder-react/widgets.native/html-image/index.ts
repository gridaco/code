import { JSX, JSXAttribute, StringLiteral } from "coli";
import { JSXElementConfig, WidgetKey } from "../../../builder-web-core";
import { SelfClosingContainer } from "../container";

export class ImageElement extends SelfClosingContainer {
  _type = "img";
  readonly src: string;
  readonly alt: string;
  constructor({ key, src }: { key: WidgetKey; src: string }) {
    super({ key });

    this.src = src;
    this.alt = `image of ${key.name}`;
  }

  styleData() {
    return super.styleData();
  }

  jsxConfig() {
    return <JSXElementConfig>{
      tag: JSX.identifier("img"),
      attributes: [
        //
        new JSXAttribute("src", new StringLiteral(this.src)),
        this.alt && new JSXAttribute("alt", new StringLiteral(this.alt)),
      ],
    };
  }
}
