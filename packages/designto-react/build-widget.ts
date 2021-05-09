import * as core from "@reflect-ui/core";
import * as react from "@coli.codes/react-builder";
import { IWidgetWithStyle } from "@coli.codes/web-builder-core/widget-with-style";

export function buildReactWidgetFromReflectWidget(
  widget: core.Widget
): IWidgetWithStyle {
  const _reactWidgetChildren = widget.children?.map((c) =>
    buildReactWidgetFromReflectWidget(c)
  );

  let thisReactWidget: IWidgetWithStyle;
  if (widget instanceof core.Column) {
    thisReactWidget = new react.Column();
  } else if (widget instanceof core.Row) {
    thisReactWidget = new react.Row();
  } else {
    // todo - handle case more specific
    thisReactWidget = new react.Container();
  }

  // finilize and return
  // set children if possible.
  if (thisReactWidget instanceof react.ReactMultiChildWidget) {
    thisReactWidget.children = _reactWidgetChildren;
  }

  return thisReactWidget;
}
