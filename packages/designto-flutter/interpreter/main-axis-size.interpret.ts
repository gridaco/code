import { ReflectSceneNode } from "@design-sdk/core/nodes";
import { MainAxisSize } from "@bridged.xyz/flutter-builder";

export function interpretMainAxisSize(node: ReflectSceneNode): MainAxisSize {
  if (node.layoutGrow === "STRETCH") {
    return MainAxisSize.max;
  } else {
    return MainAxisSize.min;
  }
}
