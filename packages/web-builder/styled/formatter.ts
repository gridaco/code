///
/// inner tagged template style string is not formatted by default prettier formatter.
/// it needs to be done manually.
///

/**
 * from
 * ```
 * `
 * color: white;
 * width: 24px;
 * `
 * ```
 *
 * to
 * ```
 * `
 *  color: white;
 *  width: 24px;
 * `
 * ```
 */
export function formatStyledTempplateString(styleString: string): string {
  const lines = [];
  let declarationLines = 0;
  styleString.split("\n").map((l) => {
    if (l.length <= 1) {
      // this is not a style property line. ignore it
      lines.push(l);
    } else {
      lines.push(`\t${l}`);
      declarationLines += 1;
    }
  });

  if (declarationLines == 0) {
    // if no actual style declration in style string.
    return "";
  }

  return lines.join("\n");
}
