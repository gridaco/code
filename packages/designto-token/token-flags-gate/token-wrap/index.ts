///
///

import { Column, Row } from "@reflect-ui/core";

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
export function tokenize_flagged_wrap() {
  //
}

/**
 * validate if layer casted as wrap can be actually tokenized to wrap.
 * @param input
 */
function validate_input(input: InputLayout): void {
  //
}
