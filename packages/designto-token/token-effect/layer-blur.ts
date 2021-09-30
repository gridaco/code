import { nodes } from "@design-sdk/core";
import { Widget, WidgetKey, Blurred } from "@reflect-ui/core";
import { BlurEffect } from "@reflect-ui/core/lib/cgr/effects";

export function wrap_with_layer_blur(
  node: nodes.ReflectSceneNode,
  widget: Widget
): Blurred {
  const _blur: BlurEffect | any = node.effects.find((d) => {
    if (d.type === "LAYER_BLUR") {
      return d;
    }
  });

  return new Blurred({
    key: new WidgetKey({
      ...widget.key,
      id: widget.key.id + "_layer_blur",
    }),
    child: widget,
    blur: _blur,
  });
}
