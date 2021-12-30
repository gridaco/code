import { AsTextSpanFlag } from "@code-features/flags";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import type { Text } from "@reflect-ui/core";
import { tokenizeText } from "../../token-text";

export function tokenize_flagged_span(
  node: ReflectSceneNode,
  flag: AsTextSpanFlag
) {
  if (flag.value === false) return node;
  if (node.type !== "TEXT") return node;

  const text = tokenizeText.fromText(node);
  text.element_preference_experimental = `span`;
  return text;
}
