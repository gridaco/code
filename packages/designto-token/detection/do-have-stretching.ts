import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function hasStretching(node: ReflectSceneNode) {
  return node.layoutAlign && node.layoutAlign === "STRETCH";
}
