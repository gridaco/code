import { Container, Widget, WidgetKey } from "@reflect-ui/core";

export class XFigmaEmbedView extends Container {
  readonly _type = "x/figma-embed-view";
  constructor({ key }: { key: WidgetKey }) {
    super({ key });
  }
}
