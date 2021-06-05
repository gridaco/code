import * as core from "@reflect-ui/core";
import * as react from "@coli.codes/react-builder";
import { ReactWidget } from "@coli.codes/react-builder";
import { keyFromWidget } from "@coli.codes/web-builder-core";

export function buildReactWidgetFromReflectWidget(
  widget: core.Widget
): ReactWidget {
  const handleChildren = (children: Array<core.Widget>): Array<ReactWidget> => {
    return children?.map((c) => {
      return buildReactWidgetFromReflectWidget(c);
    });
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
      children: handleChildren(widget.children),
      key: _key,
    });
  } else if (widget instanceof core.Text) {
    thisReactWidget = new react.Text({
      ...widget,
      data: widget.data,
      key: _key,
    });
  } else {
    // todo - handle case more specific
    thisReactWidget = new react.ErrorWidget({
      key: _key,
    });
  }

  return thisReactWidget;
}
