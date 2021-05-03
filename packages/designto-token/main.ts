import { nodes } from "@bridged.xyz/design-sdk";
import { fromRectangle } from "./container";

function row() {
  "flex-direction: row";
  "display: flex";
}

function interpretReflectNodesToWidgetTree(node: nodes.ReflectSceneNode) {
  switch (node.type) {
    // case nodes.ReflectSceneNodeType.component:
    //   break;
    // case nodes.ReflectSceneNodeType.ellipse:
    //   break;
    case nodes.ReflectSceneNodeType.rectangle:
      return fromRectangle(node as nodes.ReflectRectangleNode);
      break;

    default:
      console.error(`${node.type} is not yet handled by "@designto/token"`);
      break;
  }
}
