import { ReflectSceneNode } from "@design-sdk/figma-node";
import { Expanded, WidgetKey } from "@reflect-ui/core";
import type { Widget } from "@reflect-ui/core";
import assert from "assert";

export function wrap_with_expanded(
  node: ReflectSceneNode,
  widget: Widget
): Expanded {
  assert(
    node.layoutGrow >= 1,
    "layoug grow must be >= 1 to be wrapped with Expanded"
  );

  return new Expanded({
    key: new WidgetKey({
      ...widget.key,
      id: widget.key.id + "_opacity",
    }),
    child: widget,
    flex: node.layoutGrow,
  });
}
