import { handle } from "@coli.codes/builder";
import {
  JSXElementConfig,
  StylableJSXElementConfig,
  TextChildWidget,
  JsxWidget,
} from "@web-builder/core";
import {
  JSXChildLike,
  JSXClosingElement,
  JSXElement,
  JSXIdentifier,
  JSXOpeningElement,
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
  children: Array<JSXChildLike>
): JSXChildLike {
  switch (container.type) {
    case "static-tree": {
      return handle<JSXChildLike>(container.tree);
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

export function buildJsx(widget: JsxWidget): JSXChildLike {
  const children = buildChildrenJsx(widget.children);
  const container = buildContainingJsx(widget.jsxConfig(), children);
  return container;
}

export function buildChildrenJsx(
  children: Array<JsxWidget>
): Array<JSXChildLike> {
  return children?.map((c) => {
    return buildJsx(c);
  });
}
