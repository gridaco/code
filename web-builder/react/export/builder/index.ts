import { ColiObjectLike, handle } from "@coli.codes/builder";
import { JSXElementConfig } from "@coli.codes/web-builder-core";
import {
  JSX,
  JSXClosingElement,
  JSXElement,
  JSXElementLike,
  JSXIdentifier,
  JSXOpeningElement,
  JSXText,
} from "coli";
import {
  ReactMultiChildWidget,
  ReactSingleChildWidget,
  ReactTextChildWidget,
  ReactWidget,
} from "../../widgets.native";
import { ReactComponentExportable } from "../exportable";

export function buildWidgetExportable(widget: ReactWidget) {
  const _key = widget.key;
  const _id = _key.id;
  const _name = _key.name;
  const jsxconfg = widget.jsxConfig();
  let jsx;
  let style;

  if (widget instanceof ReactMultiChildWidget) {
    const children = widget.children;
    jsx = buildJsx(widget);

    //
  } else if (widget instanceof ReactSingleChildWidget) {
    const child = widget.child;
    jsx = buildJsx(widget);
    //
  } else if (widget instanceof ReactTextChildWidget) {
    const text = widget.text;
    jsx = buildTextChildJsx(widget);
    //
  }

  //   return new ReactComponentExportable({});
}

function handleWidget(widget: ReactWidget) {}

function buildTextChildJsx(textchildwidget: ReactTextChildWidget) {
  const config = textchildwidget.jsxConfig();
  const text = textchildwidget.text;
  const tag = handle<JSXIdentifier>(config.tag);

  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      atrributes: config.attributes,
    }),
    children: new JSXText(text),
    closingElement: new JSXClosingElement(tag),
  });
}

function buildContainingJsx(
  container: JSXElementConfig,
  children: Array<JSXElementLike>
): JSXElementLike {
  const tag = handle<JSXIdentifier>(container.tag);
  return new JSXElement({
    openingElement: new JSXOpeningElement(tag, {
      atrributes: container.attributes,
    }),
    closingElement: new JSXClosingElement(tag),
    children: children,
  });
}

function buildJsx(widget: ReactWidget): JSXElementLike {
  const children = buildChildrenJsx(widget.children);
  const container = buildContainingJsx(widget.jsxConfig(), children);
  return container;
}

function buildChildrenJsx(children: Array<ReactWidget>): Array<JSXElementLike> {
  return children?.map((c) => {
    return buildJsx(c);
  });
}
