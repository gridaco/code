import * as core from "@reflect-ui/core";
import * as react from "@coli.codes/react-builder";
import { ReactWidget } from "@coli.codes/react-builder";
import { keyFromWidget } from "@coli.codes/web-builder-core";

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
  } else if (widget instanceof core.Text) {
    thisReactWidget = new react.Text({
      ...widget,
      data: widget.data,
      key: _key,
    });
  }
  // execution order matters - some above widgets inherits from Container, this shall be handled at the last.
  else if (widget instanceof core.Container) {
    thisReactWidget = new react.Container({
      ...widget,
      key: _key,
      borderRadius: widget.borderRadius,
    });
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
