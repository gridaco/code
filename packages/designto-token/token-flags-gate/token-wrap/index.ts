///
///

import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { Column, Row, Wrap } from "@reflect-ui/core";
import type { AsWrapFlag } from "@code-features/flags/--as-wrap";
import { keyFromNode } from "../../key";
import { tokenize } from "../..";
import { default_tokenizer_config } from "../../config";
import { handleChildren } from "../../main";

type InputLayout = Array<Column | Row>;

/**
 *
 * from
 * ```
 * row[
 *  col [1, 2, 3],
 *  col [4, 5, 6],
 *  col [7, 8, 9]
 * ]
 * ```
 *
 * to
 * ```
 * wrap[1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 */
export function tokenize_flagged_wrap(
  node: ReflectSceneNode,
  flag: AsWrapFlag
) {
  const validated = validate_input(node);
  if (validated.error === false) {
    return new Wrap({
      key: keyFromNode(validated.wrap_root),
      children: handleChildren(
        validated.wrap_children,
        "dangerously_use_current"
      ),
    });
  }
}

/**
 * validate if layer casted as wrap can be actually tokenized to wrap.
 *
 * 1. the root should be a column or row
 * 2. the children should be columns or rows
 * @param input
 */
function validate_input(
  node: ReflectSceneNode
):
  | {
      error: false;
      wrap_root: ReflectSceneNode;
      wrap_children: Array<ReflectSceneNode>;
    }
  | { error: string } {
  const tokenized = tokenize(node, {
    ...default_tokenizer_config,
    max_depth: 1, // the root = 0, first level children = 1
  });

  // 1. the root should be a column or row
  if (tokenized instanceof Column || tokenized instanceof Row) {
    // if children len = 0, it's ok. all logic passed.
    if (tokenized.children.length === 0) {
      return {
        wrap_root: node,
        wrap_children: [],
        error: false,
      };
    }
    // 2. the children should be columns or rows
    const childrentype = tokenized.children[0]._type;
    const has_mixed_chilren = tokenized.children.some((c) => {
      c._type !== childrentype;
    });
    if (has_mixed_chilren) {
      return {
        error: `mixed children error : wrap can only have columns or rows as children`,
      };
    }
    //
    return {
      wrap_root: node,
      wrap_children: node.children,
      error: false,
    };
  }
  return {
    error: `invalid root type error : wrap can only be a column or row`,
  };
}
