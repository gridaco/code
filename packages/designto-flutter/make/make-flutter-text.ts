import * as flutter from "@bridged.xyz/flutter-builder";
import { nodes } from "@design-sdk/figma";
import { makeTextStyle } from "./make-flutter-text-style";
import { mapTextAlign } from "../core-type-mappers";
import { escapeDartString } from "@coli.codes/escape-string";

/**
 * [Flutter#Text](https://flutter.dev/docs/development/ui/widgets/text)
 *
 * makes Text from TextNode
 * @param node text node from desing
 */
export function makeText(node: nodes.ReflectTextNode): flutter.Text {
  const textAlign = mapTextAlign(node.textAlignHorizontal);

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
