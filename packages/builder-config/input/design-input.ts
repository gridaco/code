import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { mapGrandchildren } from "@design-sdk/figma-utils";
import { NodeRepository } from "@design-sdk/figma-node-repository";
import type { ComponentNode } from "@design-sdk/figma";
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
    this.id = id ?? entry?.id ?? "unknown";
    this.name = name ?? entry?.name ?? "unknown";
    this.repository =
      repository ?? new NodeRepository({ nodes: [entry as any] });
  }

  static fromDesign(design: ReflectSceneNode): DesignInput {
    const repository = new NodeRepository({
      // components not supported for `fromdesign`
      components: null,
      nodes: this._flat_all(design),
    });

    return new DesignInput({
      entry: design,
      repository: repository,
    });
  }

  static fromDesignWithComponents({
    design,
    components,
  }: {
    design: ReflectSceneNode;
    components: { [key: string]: ComponentNode } | ComponentNode[];
  }) {
    const repository = new NodeRepository({
      components: Object.values(components),
      nodes: this._flat_all(design),
    });

    return new DesignInput({ entry: design, repository: repository });
  }

  static forMasterComponent({
    all,
    master,
    components,
  }: {
    /**
     * usually pages. Document#pages
     */
    all: { id: string; name: string; children: ReflectSceneNode[] }[];
    master: ReflectSceneNode;
    components: { [key: string]: ComponentNode } | ComponentNode[];
  }) {
    const repository = new NodeRepository({
      components: Object.values(components),
      nodes: all.map((p) => p.children.map(this._flat_all).flat()).flat(),
    });

    return new DesignInput({ entry: master, repository: repository });
  }

  static fromApiResponse({
    raw,
    entry,
  }: {
    raw: RawNodeResponse;
    entry: ReflectSceneNode;
  }): DesignInput {
    const repository = new NodeRepository({
      components: [...(Object.values(raw.components) as any)],
      nodes: this._flat_all(entry),
    });
    return new DesignInput({ entry: entry, repository: repository });
  }

  private static _flat_all(entry) {
    return mapGrandchildren(entry, 0, {
      includeThis: true,
      ignoreGroup: false,
    });
  }
}
