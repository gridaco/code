import { ReflectSceneNode } from "@design-sdk/figma-node";

export function containsMasking(node: ReflectSceneNode) {
  return node.children?.some(ismaskier);
}

export function ismaskier(node: ReflectSceneNode): boolean {
  return node.isMask;
}
