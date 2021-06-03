export class WidgetKey {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface WidgetKey {
  id: string;
  name: string;
}

export type WidgetKeyLike = WidgetKey;

export class Widget {
  readonly key: WidgetKeyLike;
  constructor({ key }: { key: WidgetKey }) {
    this.key = key;
  }
}

export interface IMultiChildWidget {
  children: Widget[];
}
