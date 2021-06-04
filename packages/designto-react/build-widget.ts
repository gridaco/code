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

  let thisReactWidget: ReactWidget;
  if (widget instanceof core.Column) {
    thisReactWidget = new react.Column({
      key: keyFromWidget(widget),
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Row) {
    thisReactWidget = new react.Row({
      key: keyFromWidget(widget),
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Stack) {
    thisReactWidget = new react.Stack({
      key: keyFromWidget(widget),
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Text) {
    thisReactWidget = new react.ReflectText({
      key: keyFromWidget(widget),
      data: widget.data,
    });
  } else {
    // todo - handle case more specific
    thisReactWidget = new react.ErrorWidget({
      key: keyFromWidget(widget),
    });
  }

  return thisReactWidget;
}
