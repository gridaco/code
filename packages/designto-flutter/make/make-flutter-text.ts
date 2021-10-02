import * as flutter from "@flutter-builder/flutter";
import { nodes } from "@design-sdk/figma";
import { escapeDartString } from "@coli.codes/escape-string";
import * as dartui from "../dart-ui";
import * as painting from "../painting";

/**
 * [Flutter#Text](https://flutter.dev/docs/development/ui/widgets/text)
 *
 * makes Text from TextNode
 * @param node text node from desing
 */
export function makeText(node: nodes.ReflectTextNode): flutter.Text {
  const textAlign = dartui.textAlign(node.textAlign);

  //#region get text content
  let text = node.text;
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

  // const escapedText = escapeDartString(text);
  // const textStyle = painting.textStyle(node);

  // return new flutter.Text(escapedText, {
  //   style: textStyle,
  //   textAlign: textAlign,
  // });
  throw "not used";
}
