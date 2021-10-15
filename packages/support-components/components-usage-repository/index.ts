import type { InstanceMetaToken } from "../tokens/token-instance";
import type { MasterComponentMetaToken } from "../tokens/token-master-component";

export class ComponentsUsageRepository {
  readonly components: MasterComponentMetaToken<any>[];
  readonly usage: { [id: string]: InstanceMetaToken<any> };

  constructor({
    components,
    usage,
  }: {
    readonly components: MasterComponentMetaToken<any>[];
    readonly usage: { [id: string]: InstanceMetaToken<any> };
  }) {
    this.components = components;
    this.usage = usage;
  }

  getMasterComponentOf(id: string) {
    return this.usage[id].master;
  }
}
