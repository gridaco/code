import * as core from "@reflect-ui/core";
import * as react from "../builder-react";
import { ReactWidget } from "../builder-react";
import { keyFromWidget } from "../builder-web-core";

export function buildReactWidgetFromReflectWidget(
  widget: core.Widget
): ReactWidget {
  const handleChildren = (children: core.Widget[]): ReactWidget[] => {
    return children?.map((c) => {
      return handleChild(c);
    });
  };

  const handleChild = (child: core.Widget): ReactWidget => {
    return buildReactWidgetFromReflectWidget(child);
  };

  const _key = keyFromWidget(widget);

  let thisReactWidget: ReactWidget;
  if (widget instanceof core.Column) {
    thisReactWidget = new react.Column({
      ...widget,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Row) {
    thisReactWidget = new react.Row({
      ...widget,
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Stack) {
    thisReactWidget = new react.Stack({
      ...widget,
      children: handleChildren(widget.children as []),
      key: _key,
    });
  } else if (widget instanceof core.SingleChildScrollView) {
    // since web css does not require additional hierarchy for scroll view, we can simply merge properties.
    // merge single child scroll view properties for
    thisReactWidget = new react.Flex({
      ...widget.child,
      ...widget,
      overflow: "auto",
      children: handleChildren(widget.children as []),
      key: _key,
    });
    //
  } else if (widget instanceof core.Text) {
    thisReactWidget = new react.Text({
      ...widget,
      data: widget.data,
      key: _key,
    });
  } else if (widget instanceof core.VectorWidget) {
    thisReactWidget = new react.SvgElement({
      ...widget,
      data: widget.data,
      key: _key,
    });
  } else if (widget instanceof core.ImageWidget) {
    thisReactWidget = new react.ImageElement({
      ...widget,
      src: widget.src,
      key: _key,
    });
  } else if (widget instanceof core.IconWidget) {
    // TODO: not ready - svg & named icon not supported
    switch ((widget.icon as core.IconData)._type) {
      case "named-icon": {
        thisReactWidget = new react.ImageElement({
          ...widget,
          src:
            "https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png", // TODO: change this
          key: _key,
        });
        break;
      }
      case "remote-uri": {
        thisReactWidget = new react.ImageElement({
          ...widget,
          src: widget.icon.uri,
          key: _key,
          alt: "icon",
        });
        break;
      }
    }
  }

  // execution order matters - some above widgets inherits from Container, this shall be handled at the last.
  else if (widget instanceof core.Container) {
    thisReactWidget = new react.Container({
      ...widget,
      key: _key,
      borderRadius: widget.borderRadius,
    });
    thisReactWidget.color = widget.color;
    thisReactWidget.x = widget.x;
    thisReactWidget.y = widget.y;
    thisReactWidget.width = widget.width;
    thisReactWidget.height = widget.height;
    thisReactWidget.background = widget.background;
  } else {
    // todo - handle case more specific
    thisReactWidget = new react.ErrorWidget({
      key: _key,
      errorMessage: `The input design was not handled. "${
        widget.key.originName
      }" type of "${widget._type}" - ${JSON.stringify(widget)}`,
    });
  }

  return thisReactWidget;
}
