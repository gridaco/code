import type { WidgetKey, WidgetKeyLike } from "../widget-key";
import type { JSXAttributes, JSXChildLike, JSXIdentifier } from "coli";
import type { ColiObjectLike } from "@coli.codes/builder";

// import { DeclarationWidgetToken } from "@code-features/module";
// export type WebWidget = JsxWidget | DeclarationWidgetToken;

/**
 * TODO: rename to JSXWidgetElement
 *
 * A Tree style representation of a jsx widget.
 */
export abstract class JsxWidget {
  readonly _type: string;
  readonly key: WidgetKeyLike;
  children?: JsxWidget[];
  constructor({ key }: { key: WidgetKey }) {
    this.key = key;
  }

  abstract jsxConfig(): JSXElementConfig;
}

export interface IMultiChildJsxWidget {
  children: JsxWidget[];
}

interface TagAndAttributeSegment {
  tag: ColiObjectLike<JSXIdentifier>;
  attributes?: JSXAttributes;
}

interface StaticTree<T = ColiObjectLike<JSXChildLike>> {
  tree: T;
}

export type UnstylableJSXElementConfig<T = ColiObjectLike<JSXChildLike>> =
  StaticTree<T> & {
    type?: "static-tree";
  };

export type StylableJSXElementConfig = TagAndAttributeSegment & {
  type?: "tag-and-attr";
};

export type JSXElementConfig =
  | StylableJSXElementConfig
  | UnstylableJSXElementConfig;
