import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function hasFlexGrow(node: ReflectSceneNode) {
  return node.layoutGrow >= 1;
}
