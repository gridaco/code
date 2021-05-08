import { nodes } from "@design-sdk/core";
import { Widget } from "@reflect-ui/core";
import { utils } from "@design-sdk/core";
import { tokenizeText } from "./text";
import { tokenizeLayout } from "./layout";
import { tokenizeContainer } from "./container";
import { tokenizeVector, tokenizeBitmap } from "./graphics";

/**
 * ENTRY POINT MAIN FUCTION
 * Main function for converting reflect design node tree to reflect widget token tree
 */
export function tokenize(node: nodes.ReflectSceneNode): Widget {
  if (!node) {
    throw "A valid design node should be passed in order to tokenize it into a reflect widget.";
  }
  return interpretReflectNodesToWidgetTree(node);
}

function interpretReflectNodesToWidgetTree(
  node: nodes.ReflectSceneNode
): Widget {
  // region map the children first
  const children = utils.mapChildren(node);
  let _tokenizedChildren;
  if (children.length > 0) {
    _tokenizedChildren = children.map((c) => {
      return interpretReflectNodesToWidgetTree(c);
    });
  }
  // endregion map the children first

  let tokenizedTarget: Widget;
  switch (node.type as string) {
    case nodes.ReflectNodeType.rectangle:
      tokenizedTarget = tokenizeContainer.fromRectangle(
        node as nodes.ReflectRectangleNode
      );
      break;

    case nodes.ReflectNodeType.text:
      tokenizedTarget = tokenizeText.fromText(node as nodes.ReflectTextNode);
      break;

    case nodes.ReflectNodeType.frame:
      tokenizedTarget = tokenizeLayout.fromFrame(
        node as nodes.ReflectFrameNode
      );
      break;

    case nodes.ReflectNodeType.star:
      tokenizedTarget = tokenizeVector.fromStar();
    case nodes.ReflectNodeType.poligon:
      tokenizedTarget = tokenizeVector.fromPoligon();

    case nodes.ReflectNodeType.line:
    default:
      console.error(`${node.type} is not yet handled by "@designto/token"`);
      _tokenizedChildren = {};
      break;
  }

  // link the children if possible
  if ("children" in tokenizedTarget) {
    (tokenizedTarget as any).children = _tokenizedChildren;
  }

  // return the final value
  return tokenizedTarget;
}
