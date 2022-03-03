import { nodes } from "@design-sdk/core";
import { Stretched } from "../tokens";
import { Widget, WidgetKey } from "@reflect-ui/core";

export function wrap_with_stretched(
  node: nodes.ReflectSceneNode,
  widget: Widget
) {
  return new Stretched({
    key: new WidgetKey({
      ...widget.key,
      id: widget.key.id + "_stretched",
    }),
    child: widget,
    axis: node.parent?.layoutMode,
  });
}
