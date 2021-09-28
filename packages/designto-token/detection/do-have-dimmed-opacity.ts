import type { ReflectSceneNode } from "@design-sdk/figma-node";

export function hasDimmedOpacity(node: ReflectSceneNode) {
  return (
    node.opacity >= 0 && node.opacity < 1 && typeof node.opacity !== "undefined"
  );
}
