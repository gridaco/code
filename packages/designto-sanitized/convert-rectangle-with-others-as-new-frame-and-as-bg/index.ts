import {
  ReflectFrameNode,
  ReflectRectangleNode,
  ReflectGroupNode,
} from "@design-sdk/core";
import type { ReflectSceneNode } from "@design-sdk/core";
import { convert_frame_to_autolayout_if_possible } from "../convert-frame-to-autolayout-if-possible";
import { convert } from "@design-sdk/figma-node-conversion";
import { retrieveCollidingChildren } from "@design-sdk/core/utils";

/**
 * Identify all nodes that are inside Rectangles and transform those Rectangles into Frames containing those nodes.
 */
export function convert_rectangle_with_others_as_new_frame_and_as_bg(
  node: ReflectFrameNode | ReflectGroupNode
): ReflectFrameNode | ReflectGroupNode {
  if (node.children.length < 2) {
    return node;
  }
  if (!node.id) {
    throw new Error(
      "Node is missing an id! This error should only happen in tests."
    );
  }

  const colliding = retrieveCollidingChildren(node.children);

  const parent_keys = Object.keys(colliding);
  // start with all children. This is going to be filtered.
  let updatedChildren: Array<ReflectSceneNode> = [...node.children];

  parent_keys.forEach((parent_id) => {
    // dangerous cast, but this is always true
    const parentNode = node.children.find(
      (d) => d.id === parent_id
    ) as ReflectRectangleNode;

    // retrieve the position. Key should always be at the left side, so even when other items are removed, the index is kept the same.
    const indexPosition = updatedChildren.findIndex((d) => d.id === parent_id);

    // filter the children to remove those that are being modified
    updatedChildren = updatedChildren.filter(
      (d) =>
        !colliding[parent_id].map((dd) => dd.id).includes(d.id) &&
        parent_id !== d.id
    );

    const new_frame_converted_from_rect = convert.forceRectangleToFrame(
      parentNode,
      /**
       *  -1 for the rect being converted.
       */
      node.children.length - 1
    );

    // todo when the soon-to-be-parent is larger than its parent, things get weird. Happens, for example, when a large image is used in the background. Should this be handled or is this something user should never do?
    new_frame_converted_from_rect.children = [...colliding[parent_id]];
    colliding[parent_id].forEach((d) => {
      d.parent = new_frame_converted_from_rect;
      d.x = d.x - new_frame_converted_from_rect.x;
      d.y = d.y - new_frame_converted_from_rect.y;
    });

    // try to convert the children to AutoLayout, and insert back at updatedChildren.
    updatedChildren.splice(
      indexPosition,
      0,
      convert_frame_to_autolayout_if_possible(new_frame_converted_from_rect)
    );
  });

  if (updatedChildren.length > 0) {
    node.children = updatedChildren;
  }

  // convert the resulting node to AutoLayout.
  node = convert_frame_to_autolayout_if_possible(node);

  return node;
}
