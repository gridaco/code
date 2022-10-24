import { DimensionLength, Text, Widget, WidgetKey } from "@reflect-ui/core";

export class SizedText extends Widget {
  readonly _type = "SizedText";
  readonly height?: DimensionLength;
  readonly width?: DimensionLength;
  readonly child: Text;

  constructor({
    key,
    width,
    height,
    child,
  }: {
    key: WidgetKey;
    child: Text;
    width?: DimensionLength;
    height?: DimensionLength;
  }) {
    super({ key });

    this.child = child;
    this.width = width;
    this.height = height;
  }
}
