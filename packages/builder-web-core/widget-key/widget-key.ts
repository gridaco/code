export type WidgetKeyId = string;

export class WidgetKey {
  id: WidgetKeyId;
  name: string;

  constructor(id: WidgetKeyId, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface WidgetKey {
  id: WidgetKeyId;
  name: string;
}

export type WidgetKeyLike = WidgetKey;
