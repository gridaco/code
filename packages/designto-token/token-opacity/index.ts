import { nodes } from "@design-sdk/core";
import { Widget, WidgetKey, Opacity } from "@reflect-ui/core";

export function wrap_with_opacity(
  node: nodes.ReflectSceneNode,
  widget: Widget
): Opacity {
  return new Opacity({
    key: new WidgetKey({
      ...widget.key,
      id: widget.key.id + "_opacity",
    }),
    child: widget,
    opacity: node.opacity,
  });
}
