import type { ReflectSceneNode } from "@design-sdk/core";
import { mapGrandchildren } from "@design-sdk/core/utils";
import { NodeRepository } from "@design-sdk/figma";
import { RawNodeResponse } from "@design-sdk/figma-remote";

export interface IDesignInput {
  id: string;
  name: string;
  entry: ReflectSceneNode;
  repository?: NodeRepository;
}

export class DesignInput implements IDesignInput {
  id: string;
  name: string;
  entry: ReflectSceneNode;
  repository?: NodeRepository;

  constructor({
    id,
    name,
    entry,
    repository,
  }: {
    id?: string;
    name?: string;
    entry: ReflectSceneNode;
    repository?: NodeRepository;
  }) {
    this.entry = entry;
    this.id = id ?? entry.id;
    this.name = name ?? entry.name;
    this.repository =
      repository ?? new NodeRepository({ nodes: [entry as any] });
  }

  static fromDesign(design: ReflectSceneNode): DesignInput {
    const _allnodes = mapGrandchildren(design, 0, {
      includeThis: true,
      ignoreGroup: false,
    });

    const repository = new NodeRepository({
      // TODO: components not supported for `fromdesign`
      components: [],
      nodes: [...(_allnodes as any)],
    });

    return new DesignInput({ entry: design, repository: repository });
  }

  static fromApiResponse({
    raw,
    entry,
  }: {
    raw: RawNodeResponse;
    entry: ReflectSceneNode;
  }): DesignInput {
    const _allnodes = mapGrandchildren(entry, 0, {
      includeThis: true,
      ignoreGroup: false,
    });

    const repository = new NodeRepository({
      components: [...(Object.values(raw.components) as any)],
      nodes: [...(_allnodes as any)],
    });
    return new DesignInput({ entry: entry, repository: repository });
  }
}
