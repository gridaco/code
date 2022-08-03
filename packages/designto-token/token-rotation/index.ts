import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { Widget, WidgetKey, Rotation } from "@reflect-ui/core";

export function wrap_with_rotation(
  node: ReflectSceneNode,
  widget: Widget
): Rotation {
  return new Rotation({
    key: new WidgetKey({
      ...widget.key,
      id: widget.key.id + "_rotation",
    }),
    child: widget,
    rotation: node.rotation,
  });
}
