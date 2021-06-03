import * as core from "@reflect-ui/core";
import * as react from "@coli.codes/react-builder";
import { IWidgetWithStyle } from "@coli.codes/web-builder-core/widget-with-style";
import { ReactWidget } from "@coli.codes/react-builder";
import { makeAsStyled } from "@web-builder/styled";

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
      // id: widget.id,
      // originname: widget.originname,
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Row) {
    thisReactWidget = new react.Row({
      // id: widget.id,
      // originname: widget.originname,
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Stack) {
    thisReactWidget = new react.Stack({
      // id: widget.id,
      // originname: widget.originname,
      children: handleChildren(widget.children),
    });
  } else if (widget instanceof core.Text) {
    thisReactWidget = new react.ReflectText({
      // id: widget.id,
      // originname: widget.originname,
      data: widget.data,
    });
    console.warn("PING");
    makeAsStyled(thisReactWidget); // test code
  } else {
    // todo - handle case more specific
    thisReactWidget = new react.ErrorWidget("unknown");
  }

  return thisReactWidget;
}
