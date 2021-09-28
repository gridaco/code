///
/// WIP
///

import {
  ReflectFrameNode,
  ReflectGroupNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { containsMasking, ismaskier } from "../detection";
import { tokenizeLayout } from "../token-layout";

type MaskingSplits =
  | /**
   * the layer specified the size of the masking.
   */
  {
      type: "maskier";
      target: ReflectSceneNode;
    }
  /**
   * the target layers that gets masked (gets hidden)
   */
  | {
      type: "maskitee";
      target: ReflectSceneNode[];
    }
  /**
   * in the same hierarchy, but not part of the making.
   */
  | {
      type: "irrelavent";
      target: ReflectSceneNode[];
    };

function fromMultichild(node: ReflectGroupNode | ReflectFrameNode) {
  const hierarchy_items = node.children;
  if (containsMasking(node)) {
    // TODO: should we handle the case where that multiple maskier existing in same hierarchy?

    // 1. split as maskier | maskitee | irrelavent
    const index_of_maskier = hierarchy_items.findIndex(ismaskier);

    const maskitee = hierarchy_items.slice(0, index_of_maskier);
    const maskier = hierarchy_items[index_of_maskier];
    const irrelavent = hierarchy_items.slice(index_of_maskier + 1);

    /**
     *
     * from
     *
     * - parent
     *  - makitee 1
     *  - makitee 2
     *  - maskier
     *  - irrelavent 1
     *  - irrelavent 2
     *
     * to
     * - parent
     *  - Masking
     *   - makitee 1
     *   - makitee 2
     *   - maskier
     *  - irrelavent 1
     *  - irrelavent 2
     *
     */
    // TODO: implement above logic
    const children = [
      // maskings
      // others
    ];
    const container = tokenizeLayout.fromFrameOrGroup(node, children, {
      is_root: node.isRoot, // probably not needed - who uses masking directly under root frame?
    });
    return container;
  }
  //
}

export const tokenizeMasking = {
  fromMultichild: fromMultichild,
};
