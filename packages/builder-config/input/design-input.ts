import { ReflectSceneNode } from "@design-sdk/core/nodes";

export interface IDesignInput {
  id: string;
  name: string;
  design: ReflectSceneNode;
}

export class DesignInput implements IDesignInput {
  id: string;
  name: string;
  design: ReflectSceneNode;

  constructor({
    id,
    name,
    design,
  }: {
    id?: string;
    name?: string;
    design: ReflectSceneNode;
  }) {
    this.design = design;
    this.id = id ?? design.id;
    this.name = name ?? design.name;
  }

  static fromDesign(design: ReflectSceneNode): DesignInput {
    return new DesignInput({ design: design });
  }
}
