import { Widget, WidgetKey } from "@reflect-ui/core";
import type { MasterComponentMetaToken } from "./token-master-component";

export class InstanceWidget extends Widget {
  readonly meta: InstanceMetaToken<any>;

  constructor({ key, meta }: { key: WidgetKey; meta: InstanceMetaToken<any> }) {
    super({ key });
    this.meta = meta;
  }
}

export class InstanceMetaToken<T> {
  readonly key: WidgetKey;
  readonly master: MasterComponentMetaToken<T>;
  readonly arguments: { [key: string]: any };

  constructor({
    key,
    master,
    arguments: _arguments,
  }: {
    readonly key: WidgetKey;
    readonly master: MasterComponentMetaToken<T>;
    readonly arguments: { [key: string]: any };
  }) {
    this.key = key;
    this.master = master;
    this.arguments = _arguments;
  }
}
