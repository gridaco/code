import { Container, WidgetKey } from "@reflect-ui/core";

export class XCameraDisplayView extends Container {
  readonly _type = "x/camera-display-view";
  constructor({ key }: { key: WidgetKey } & {}) {
    super({ key });
  }
}
