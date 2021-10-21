import type { WidgetKey, WidgetKeyLike } from "../widget-key";
import { ColiObjectLike } from "@coli.codes/builder";
import { JSXAttributes, JSXElementLike, JSXIdentifier, JSXText } from "coli";

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

interface StaticTree<T = ColiObjectLike<JSXElementLike | JSXText>> {
  tree: T;
}

export type UnstylableJSXElementConfig<
  T = ColiObjectLike<JSXElementLike | JSXText>
> = StaticTree<T> & {
  type?: "static-tree";
};

export type StylableJSXElementConfig = TagAndAttributeSegment & {
  type?: "tag-and-attr";
};

export type JSXElementConfig =
  | StylableJSXElementConfig
  | UnstylableJSXElementConfig;
