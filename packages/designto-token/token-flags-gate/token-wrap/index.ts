///
///

import type { ReflectSceneNode } from "@design-sdk/figma-node";
import { Column, Row, Wrap } from "@reflect-ui/core";
import type { AsWrapFlag } from "@code-features/flags/--as-wrap";
import { keyFromNode } from "../../key";

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
  return new Wrap({
    key: keyFromNode(node),
    children: [], // TODO:
  });
}

/**
 * validate if layer casted as wrap can be actually tokenized to wrap.
 *
 * 1. the root should be a column or row
 * 2. the children should be columns or rows
 * @param input
 */
function validate_input(node: ReflectSceneNode): void {
  if (node) {
    //
  }
  //
}
