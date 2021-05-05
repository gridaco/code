import { Column, Row, Widget } from "@reflect-ui/core";

export function buildReactWidgetFromReflectWidget(widget: Widget) {
  if (widget instanceof Column) {
  } else if (widget instanceof Row) {
    // function row() {
    //   "flex-direction: row";
    //   "display: flex";
    // }
  }
  //
}
