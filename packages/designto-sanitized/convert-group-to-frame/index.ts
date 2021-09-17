import { ReflectFrameNode, ReflectGroupNode } from "@design-sdk/core/nodes";
import type { ReflectSceneNode } from "@design-sdk/core/nodes";

// TODO - Additional feature, this needs to be migrated to @designto/token/logics
/**
 * @todo
 * @deprecated leave the current usage, but don't use this for future usage. this is not fully tested. converting group to centered frame is dangerous.
 * @param node
 * @returns
 */
export function convert_group_to_frame(
  node: ReflectGroupNode
): ReflectFrameNode {
  const newNode = new ReflectFrameNode({
    id: node.id,
    name: node.name,
    parent: node.parent,
    originParentId: node.originParentId,
    origin: node.origin,
    absoluteTransform: node.absoluteTransform,
    childrenCount: node.childrenCount,
  });

  newNode.x = node.x;
  newNode.y = node.y;
  newNode.width = node.width;
  newNode.height = node.height;
  newNode.rotation = node.rotation;

  newNode.fills = [];
  newNode.strokes = [];
  newNode.effects = [];
  newNode.cornerRadius = { all: 0 };

  newNode.layoutMode = undefined;
  newNode.counterAxisSizingMode = "AUTO";
  newNode.primaryAxisSizingMode = "AUTO";
  newNode.clipsContent = false;
  newNode.layoutGrids = [];
  newNode.gridStyleId = "";
  newNode.guides = [];

  // figma: update the children's x and y position.
  updateChildrenXY(node) as ReflectFrameNode;
  newNode.children = node.children;

  // update the iterating child's  parent
  // todo - this should better be done on construction level
  newNode.children.forEach((d) => {
    d.parent = newNode;
  });

  // don't need to take care of newNode.parent.children because method is recursive.
  // .children =... calls convertGroupToFrame() which returns the correct node

  return newNode;
}

/**
 * Updates all children's X and Y value from a Group.
 * Group uses relative values, while Frame use absolute. So child.x - group.x = child.x on Frames.
 * This isn't recursive, because it is going to run from the inner-most to outer-most element. Therefore, it would calculate wrongly otherwise.
 *
 * This must be called with a GroupNode. Param accepts anything because of the recurison.
 * Result of a Group with x,y = (250, 250) and child at (260, 260) must be child at (10, 10)
 */
function updateChildrenXY(node: ReflectSceneNode): ReflectSceneNode {
  // the second condition is necessary, so it can convert the root
  // TODO migrate this logic inside ReflectSceneNode's relative position getter
  if (node instanceof ReflectGroupNode) {
    node.children.forEach((d) => {
      d.x = d.x - node.x;
      d.y = d.y - node.y;
      updateChildrenXY(d);
    });
    return node;
  } else {
    return node;
  }
}
