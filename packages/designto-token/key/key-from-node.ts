import type { ReflectSceneNode } from "@design-sdk/core";
import type { WidgetKey } from "@reflect-ui/core";
import { FigmaWidgetKey } from "../key";

export function keyFromNode(node: ReflectSceneNode): WidgetKey {
  // TODO: refactor this after multiple design origin support. now fixed to figma.
  // e.g. - if (node.$schema === 'figma'){ ... }
  return new FigmaWidgetKey({
    id: node.id,
    name: node.name,
    filekey: node.filekey,
  });
}
