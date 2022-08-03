import { ReflectSceneNode } from "@design-sdk/figma-node";
export default function makepipline(enabled?: boolean) {
  if (enabled) {
    return function (node: ReflectSceneNode) {
      if (node.isMask) {
        return false;
      }
      return node;
    };
  }

  // do nothing
  return function (node: ReflectSceneNode) {
    return node;
  };
}
