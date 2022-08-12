import { AsTextSpanFlag } from "@code-features/flags";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import type { Text } from "@reflect-ui/core";
import { unwrappedChild } from "../../wrappings";
import { tokenizeText } from "../../token-text";

export function tokenize_flagged_span(
  node: ReflectSceneNode,
  flag: AsTextSpanFlag
): Text | undefined {
  if (flag.value === false) return;
  if (node.type !== "TEXT") return;

  const text = unwrappedChild(tokenizeText.fromText(node)) as Text;
  text.element_preference_experimental = `span`;
  return text;
}
