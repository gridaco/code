import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function hasRotation(node: ReflectSceneNode) {
  return node.rotation > 0;
}
