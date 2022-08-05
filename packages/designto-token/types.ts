import type { Widget } from "@reflect-ui/core";
import type { ReflectSceneNode } from "@design-sdk/figma-node";

/**
 * Utility type to represent a converted reflect-ui/core tokens with original design core properties snapshot.
 */
export type SnapshotWidget<T extends Widget = Widget> = T & {
  snapshot: ReflectSceneNode;
};
