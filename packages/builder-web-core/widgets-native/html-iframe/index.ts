import type { ElementCssStyleData } from "@coli.codes/css";
import type { Color, DimensionLength, IWHStyleWidget } from "@reflect-ui/core";
import { WidgetKey } from "../../widget-key";
import type { StylableJSXElementConfig } from "../../widget-core";
import { Container } from "../container";
import * as css from "@web-builder/styles";
import { JSX, JSXAttribute, StringLiteral } from "coli";

type IframeAttrSandbox =
  | "allow-downloads-without-user-activation"
  | "allow-downloads"
  | "allow-forms"
  | "allow-modals"
  | "allow-orientation-lock"
  | "allow-pointer-lock"
  | "allow-popups"
  | "allow-popups-to-escape-sandbox"
  | "allow-presentation"
  | "allow-same-origin"
  | "allow-scripts"
  | "allow-storage-access-by-user-activation"
  | "allow-top-navigation"
  | "allow-top-navigation-by-user-activation";

type IframeAttrReferrerPolicy =
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";

export interface IIframeProps {
  readonly id?: string;
  readonly title?: string;

  readonly src?: string;
  readonly srcdoc?: string;
  readonly width: DimensionLength;
  readonly height: DimensionLength;

  readonly allow?: string;
  readonly loading?: "eager" | "lazy";
  readonly name?: string;
  readonly referrerpolicy?: IframeAttrReferrerPolicy;
  readonly sandbox?: IframeAttrSandbox | ReadonlyArray<IframeAttrSandbox>;
}

export class HtmlIframe extends Container implements IIframeProps {
  readonly id?: string;
  readonly title?: string;

  readonly src?: string;
  readonly srcdoc?: string;
  readonly width: DimensionLength;
  readonly height: DimensionLength;

  readonly allow?: string;
  readonly loading?: "eager" | "lazy";
  readonly name?: string;
  readonly referrerpolicy?: IframeAttrReferrerPolicy;
  readonly sandbox?: IframeAttrSandbox | ReadonlyArray<IframeAttrSandbox>;

  constructor({
    key,
    id,
    title,
    src,
    srcdoc,
    width,
    height,
    allow,
    loading,
    name,
    referrerpolicy,
    sandbox,
    ...rest
  }: { key: WidgetKey } & IIframeProps & IWHStyleWidget) {
    super({ key, ...rest });

    this.id = id;
    this.title = title;
    this.src = src;
    this.srcdoc = srcdoc;
    this.width = width;
    this.height = height;
    this.allow = allow;
    this.loading = loading;
    this.name = name;
    this.referrerpolicy = referrerpolicy;
    this.sandbox = sandbox;
  }
  //

  styleData(): ElementCssStyleData {
    const containerstyle = super.styleData();

    return {
      // general layouts, continer ---------------------
      ...containerstyle,
      // -------------------------------------------------

      /* Override default CSS styles */
      border: containerstyle.border ?? "none",
      /* --------------------------- */

      // ----------------------
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    const attrs = [
      this.id && new JSXAttribute("id", new StringLiteral(this.id)),
      this.title && new JSXAttribute("title", new StringLiteral(this.title)),
      this.src && new JSXAttribute("src", new StringLiteral(this.src)),
      this.srcdoc && new JSXAttribute("srcdoc", new StringLiteral(this.srcdoc)),

      this.width &&
        new JSXAttribute("width", new StringLiteral(css.length(this.width))),
      this.height &&
        new JSXAttribute("height", new StringLiteral(css.length(this.height))),

      this.sandbox?.length > 0 &&
        new JSXAttribute(
          "sandbox",
          new StringLiteral(
            Array.isArray(this.sandbox)
              ? this.sandbox.join(" ")
              : (this.sandbox as string)
          )
        ),
    ].filter(Boolean);

    return <StylableJSXElementConfig>{
      type: "tag-and-attr",
      tag: JSX.identifier("iframe"),
      attributes: attrs,
    };
  }
}