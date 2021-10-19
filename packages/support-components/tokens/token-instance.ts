import type { MasterComponentMetaToken } from "./token-master-component";

export class InstanceMetaToken<T> {
  readonly key: string;
  readonly master: MasterComponentMetaToken<T>;
  readonly arguments: { [key: string]: any };

  constructor({
    key,
    master,
    arguments: _arguments,
  }: {
    readonly key: string;
    readonly master: MasterComponentMetaToken<T>;
    readonly arguments: { [key: string]: any };
  }) {
    this.key = key;
    this.master = master;
    this.arguments = _arguments;
  }
}
