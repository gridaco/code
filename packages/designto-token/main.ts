import { nodes } from "@design-sdk/core";
import { Container, Widget } from "@reflect-ui/core";
import { fromRectangle } from "./container";

/**
 * Main function for converting reflect design node tree to reflect widget token tree
 */
export function tokenize(node: nodes.ReflectSceneNode): Widget {
  return interpretReflectNodesToWidgetTree(node);
}

function row() {
  "flex-direction: row";
  "display: flex";
}

function interpretReflectNodesToWidgetTree(
  node: nodes.ReflectSceneNode
): Widget {
  switch (node.type) {
    // case nodes.ReflectSceneNodeType.component:
    //   break;
    // case nodes.ReflectSceneNodeType.ellipse:
    //   break;
    case nodes.ReflectSceneNodeType.rectangle:
      return fromRectangle(node as nodes.ReflectRectangleNode);
      break;

    case nodes.ReflectSceneNodeType.frame:
      return new Container();

    default:
      console.error(`${node.type} is not yet handled by "@designto/token"`);
      break;
  }
}
