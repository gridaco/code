import * as flutter from "@bridged.xyz/flutter-builder";
import { nodes } from "@design-sdk/figma";
import { makeTextStyle } from "./text-style.make";
import { interpretTextAlign } from "../interpreter/text-align.interpreter";
import { escapeDartString } from "@coli.codes/escape-string";

/**
 * makes Text from TextNode
 * @param node text node from desing
 */
export function makeText(node: nodes.ReflectTextNode): flutter.Text {
  const textAlign = interpretTextAlign(node.textAlignHorizontal);

  //#region get text content
  let text = node.characters;
  switch (node.textCase) {
    case "LOWER":
      text = text.toLowerCase();
      break;
    case "UPPER":
      text = text.toUpperCase();
      break;
    case "TITLE":
      // TODO
      break;
    case "ORIGINAL":
      break;
  }

  //#endregion
  const escapedText = escapeDartString(text);
  const textStyle = makeTextStyle(node);

  return new flutter.Text(escapedText, {
    style: textStyle,
    textAlign: textAlign,
  });
}
