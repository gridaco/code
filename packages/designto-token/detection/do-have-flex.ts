import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function hasFlexible(node: ReflectSceneNode) {
  return node.layoutGrow >= 1;
}
