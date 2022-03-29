import { Container, Widget, WidgetKey } from "@reflect-ui/core";

export class XOSMView extends Container {
  readonly _type = "x/osm-view";
  constructor({ key }: { key: WidgetKey }) {
    super({ key });
  }
}
