import { handle } from "@coli.codes/builder";
import {
  JSXElementConfig,
  StylableJSXElementConfig,
  TextChildWidget,
  StylableJsxWidget,
  JsxWidget,
} from "@web-builder/core";
import {
  JSXClosingElement,
  JSXElement,
  JSXElementLike,
  JSXIdentifier,
  JSXOpeningElement,
  JSXText,
} from "coli";

////
//// region jsx tree builder
////
export function buildTextChildJsx(
  textchildwidget: TextChildWidget,
  config: StylableJSXElementConfig
) {
  const text = textchildwidget.textData().jsxConfig();
  const tag = handle<JSXIdentifier>(config.tag);

  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      attributes: config.attributes,
    }),
    children: text.tree,
    closingElement: new JSXClosingElement(tag),
  });
}

export function buildContainingJsx(
  container: JSXElementConfig,
  children: Array<JSXElementLike>
): JSXElementLike {
  switch (container.type) {
    case "static-tree": {
      return handle<JSXElementLike>(container.tree);
    }
    case "tag-and-attr": {
      const tag = handle<JSXIdentifier>(container.tag);
      return new JSXElement({
        openingElement: new JSXOpeningElement(tag, {
          attributes: container.attributes,
        }),
        closingElement: new JSXClosingElement(tag),
        children: children,
      });
    }
    default:
      throw new Error("error while building jsx");
  }
}

export function buildJsx(widget: JsxWidget): JSXElementLike {
  const children = buildChildrenJsx(widget.children);
  const container = buildContainingJsx(widget.jsxConfig(), children);
  return container;
}

export function buildChildrenJsx(
  children: Array<JsxWidget>
): Array<JSXElementLike> {
  return children?.map((c) => {
    return buildJsx(c);
  });
}
