import { nodes } from "@design-sdk/core";
import { WidgetKey } from "@reflect-ui/core";

export function keyFromNode(node: { id: string; name: string }): WidgetKey {
  return new WidgetKey({
    id: node.id,
    originName: node.name,
  });
}
