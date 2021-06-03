import { nodes } from "@design-sdk/core";
import { Text, TextStyle } from "@reflect-ui/core";
import { keyFromNode } from "../key";

/**
 * creates ReflectTextWidget from ReflectTextNode. can be RichText or Simple Text
 * @param node
 * @returns
 */
export function fromText(node: nodes.ReflectTextNode): Text {
  // 1. check if text is rich text
  // if () //

  return new Text({
    key: keyFromNode(node),
    data: node.characters,
    style: new TextStyle({
      fontFamily: node.fontName.family,
      fontSize: node.fontSize,
      fontWeight: node.fontWeight,
      color: node.primaryColor,
      // lineheight
      // letter spacing
    }),
  });
}

export const tokenizeText = {
  fromText: fromText,
};
