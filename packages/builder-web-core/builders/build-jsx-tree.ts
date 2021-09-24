import { handle } from "@coli.codes/builder";
import {
  JSXElementConfig,
  TextChildWidget,
  WidgetTree,
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
  config: JSXElementConfig
) {
  const text = textchildwidget.text;
  const tag = handle<JSXIdentifier>(config.tag);

  const jsxtext = new JSXText(text);
  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      attributes: config.attributes,
    }),
    children: jsxtext,
    closingElement: new JSXClosingElement(tag),
  });
}

export function buildContainingJsx(
  container: JSXElementConfig,
  children: Array<JSXElementLike>
): JSXElementLike {
  const tag = handle<JSXIdentifier>(container.tag);
  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      attributes: container.attributes,
    }),
    closingElement: new JSXClosingElement(tag),
    children: children,
  });
}

export function buildJsx(widget: WidgetTree): JSXElementLike {
  const children = buildChildrenJsx(widget.children);
  const container = buildContainingJsx(widget.jsxConfig(), children);
  return container;
}

export function buildChildrenJsx(
  children: Array<WidgetTree>
): Array<JSXElementLike> {
  return children?.map((c) => {
    return buildJsx(c);
  });
}
