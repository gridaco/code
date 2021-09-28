///
/// WIP
///

import {
  ReflectFrameNode,
  ReflectGroupNode,
  ReflectSceneNode,
} from "@design-sdk/figma-node";
import { BorderRadius, ClipRRect, WidgetKey } from "@reflect-ui/core";
import { containsMasking, ismaskier } from "../detection";
import { keyFromNode } from "../key";
import { tokenizeLayout } from "../token-layout";

export type MaskingItemContainingNode = ReflectGroupNode | ReflectFrameNode;

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

function fromMultichild(node: MaskingItemContainingNode) {
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
     *  - maskitee 1
     *  - maskitee 2
     *  - maskier
     *  - irrelavent 1
     *  - irrelavent 2
     *
     * to
     * - parent
     *  - Clipped - maskier
     *   - msakitee 1
     *   - msakitee 2
     *  - irrelavent 1
     *  - irrelavent 2
     *
     */
    // TODO: implement above logic
    // if rrect
    // if custom shape

    // --------------------------------------------------
    // region clone container, preserving only maskitee
    const cloned_container = Object.assign({}, node);
    cloned_container.children = maskitee;
    // endregion
    // --------------------------------------------------

    const clippedcontents_new_layout_except_irrelavents = tokenizeLayout.fromFrameOrGroup(
      cloned_container,
      maskitee,
      {
        is_root: cloned_container.isRoot,
      }
    );

    const raw_maskier_key = keyFromNode(maskier);
    const clipped = new ClipRRect({
      key: raw_maskier_key, // we do not override key for clipped because maskier it self is not being nested, but being converted as a container-like.
      child: clippedcontents_new_layout_except_irrelavents,
      borderRadius: BorderRadius.all(maskier.radius),
    });

    const children = [
      // maskings
      clipped,
      // others
      ...irrelavent,
    ];
    const container = tokenizeLayout.fromFrameOrGroup(node, children, {
      is_root: node.isRoot, // probably not needed - who uses masking directly under root frame?
      references: hierarchy_items,
    });
    return container;
  }
  //
}

export const tokenizeMasking = {
  fromMultichild: fromMultichild,
};
