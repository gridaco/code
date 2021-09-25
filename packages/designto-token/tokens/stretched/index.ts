import { Axis, Widget, WidgetKey } from "@reflect-ui/core";

export class Stretched extends Widget {
  readonly _type = "Stretched";

  readonly axis: Axis;
  readonly child: Widget;
  constructor({
    key,
    child,
    axis,
  }: {
    key: WidgetKey;
    child: Widget;
    axis: Axis;
  }) {
    super({ key });
    this.child = child;
    this.axis = axis;
  }
}
