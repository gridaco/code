import { nodes } from "@design-sdk/core";
import {
  Container,
  Widget,
  Text,
  Flex,
  Axis,
  VerticalDirection,
} from "@reflect-ui/core";
import { fromRectangle } from "./container";
import { utils } from "@design-sdk/core";
/**
 * ENTRY POINT MAIN FUCTION
 * Main function for converting reflect design node tree to reflect widget token tree
 */
export function tokenize(node: nodes.ReflectSceneNode): Widget {
  return interpretReflectNodesToWidgetTree(node);
}

// function row() {
//   "flex-direction: row";
//   "display: flex";
// }

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
  switch (node.type) {
    case nodes.ReflectSceneNodeType.rectangle:
      tokenizedTarget = fromRectangle(node as nodes.ReflectRectangleNode);
      break;

    case nodes.ReflectSceneNodeType.text:
      tokenizedTarget = new Text();
      break;

    case nodes.ReflectSceneNodeType.frame:
      tokenizedTarget = new Flex({
        direction: Axis.vertical,
        verticalDirection: VerticalDirection.down,
      });
      break;

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
