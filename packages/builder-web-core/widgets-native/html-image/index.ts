import { CSSProperties } from "@coli.codes/css";
import assert from "assert";
import { JSX, JSXAttribute, StringLiteral } from "coli";
import { StylableJSXElementConfig, WidgetKey, k } from "../..";
import { SelfClosingContainer } from "../container";
import {
  BoxFit,
  ImageRepeat,
  cgr,
  Alignment,
  ImageWidgetManifest,
} from "@reflect-ui/core";
import * as css from "@web-builder/styles";

type HtmlImageElementProps = Omit<ImageWidgetManifest, "semanticLabel"> & {
  alt?: string;
};

export class ImageElement
  extends SelfClosingContainer
  implements HtmlImageElementProps
{
  _type = "img";

  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alignment?: Alignment;
  readonly centerSlice?: cgr.Rect;
  readonly fit?: BoxFit;
  readonly repeat?: ImageRepeat;
  alt?: string;

  constructor({
    key,
    src,
    width,
    height,
    alignment,
    centerSlice,
    fit,
    repeat,
    alt,
  }: {
    key: WidgetKey;
  } & HtmlImageElementProps) {
    super({ key });
    assert(src !== undefined, "ImageElement requires src");

    this.src = src;
    this.width = width;
    this.height = height;
    this.alignment = alignment;
    this.centerSlice = centerSlice;
    this.fit = fit;
    this.repeat = repeat;
    this.alt = alt;
  }

  styleData() {
    return <CSSProperties>{
      ...super.styleData(),
      "object-fit": object_fit(this.fit) ?? "cover",
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
          new StringLiteral(
            this.src || k.image_smallest_fallback_source_base_64
          )
        ),
      typeof this.alt === "string" &&
        new JSXAttribute("alt", new StringLiteral(this.alt)),
    ];

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("img"),
      attributes: attributes,
    };
  }
}

function object_fit(fit?: BoxFit) {
  switch (fit) {
    case BoxFit.fill:
      return "fill";
    case BoxFit.contain:
      return "contain";
    case BoxFit.cover:
      return "cover";
    case BoxFit.none:
      return "none";
    case BoxFit.scaleDown:
      return "scale-down";
    case BoxFit.fitHeight:
    case BoxFit.fitWidth:
      // TODO:
      return;
    case undefined:
    default:
      return;
  }
}
