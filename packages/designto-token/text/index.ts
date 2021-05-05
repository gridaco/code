import { nodes } from "@design-sdk/core";
import { Text } from "@reflect-ui/core";
export function fromText(node: nodes.ReflectTextNode): Text {
  return new Text();
}

export const tokenizeText = {
  fromText: fromText,
};
