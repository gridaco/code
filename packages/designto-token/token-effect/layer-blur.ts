import { nodes } from "@design-sdk/core";
import { Widget, WidgetKey } from "@reflect-ui/core";
import { Blur } from "@reflect-ui/core/lib/cgr/effects";

export function wrap_with_layer_blur(
  node: nodes.ReflectSceneNode,
  widget: Widget
): Blur {
  return new Blur({
    key: new WidgetKey({
      ...widget.key,
      id: widget.key.id + "_layer_blur",
    }),
    child: widget,
    blur: node.effects.map((d) => {
      if (d.type === "LAYER_BLUR") {
        return d;
      }
    }),
  });
}
