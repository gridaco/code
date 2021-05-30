import * as core from "@reflect-ui/core";
import * as react from "@coli.codes/react-builder";
import { IWidgetWithStyle } from "@coli.codes/web-builder-core/widget-with-style";

export function buildReactWidgetFromReflectWidget(
  widget: core.Widget
): IWidgetWithStyle {
  const handleChildren = (
    children: Array<core.Widget>
  ): Array<IWidgetWithStyle> => {
    return children?.map((c) => {
      return buildReactWidgetFromReflectWidget(c);
    });
  };

  let thisReactWidget: IWidgetWithStyle;
  if (widget instanceof core.Column) {
    thisReactWidget = new react.Column({
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Row) {
    thisReactWidget = new react.Row({
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Stack) {
    thisReactWidget = new react.Stack({
      children: handleChildren(widget.children),
    });
  } else {
    // todo - handle case more specific
    thisReactWidget = new react.Container();
  }

  return thisReactWidget;
}
