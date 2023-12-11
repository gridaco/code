import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function hasStretching(node: ReflectSceneNode): boolean {
  // FIXME: this should reflect layoutGrow as well.
  return node.layoutAlign && node.layoutAlign === "STRETCH";
}
