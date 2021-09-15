import { ReflectSceneNode } from "@design-sdk/core/nodes";
import { MainAxisSize } from "@bridged.xyz/flutter-builder";

export function interpretMainAxisSize(node: ReflectSceneNode): MainAxisSize {
  if (node.layoutGrow === 0) {
    return MainAxisSize.min;
  } else {
    return MainAxisSize.max;
  }
}
