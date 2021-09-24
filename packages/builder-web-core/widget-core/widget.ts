import type { WidgetKey, WidgetKeyLike } from "../widget-key";

export class Widget {
  readonly _type: string;
  readonly key: WidgetKeyLike;
  children?: Widget[];
  constructor({ key }: { key: WidgetKey }) {
    this.key = key;
  }
}

export interface IMultiChildWidget {
  children: Widget[];
}
