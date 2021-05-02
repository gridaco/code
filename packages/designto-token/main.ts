import { nodes } from "@bridged.xyz/design-sdk";
function toReact() {}

// 1. column
// 2. row
// grid
// stack
// table
// 3. container
// 4. align
// center
// sizedbox
// expanded
// list view

// transform

function row() {
  "flex-direction: row";
  "display: flex";
}

function interpretReflectNodesToWidgetTree(node: nodes.ReflectSceneNode) {
  switch (node.type) {
    case nodes.ReflectSceneNodeType.component:
      break;
    case nodes.ReflectSceneNodeType.ellipse:
      break;
    case nodes.ReflectSceneNodeType.rectangle:
      break;

    default:
      break;
  }
}
