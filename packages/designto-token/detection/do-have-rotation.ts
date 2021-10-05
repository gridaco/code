import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function hasRotation(node: ReflectSceneNode) {
  // FIXME: add checking relativeTransform
  return node.rotation > 0;
}
