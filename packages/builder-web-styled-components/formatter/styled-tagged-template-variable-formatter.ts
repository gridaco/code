///
/// inner tagged template style string is not formatted by default prettier formatter.
/// it needs to be done manually.
///

/**
 * from
 * ```
 * styled.span`
 * color: white;
 * width: 24px;
 * ::placeholder {
 *  color: red;
 * }
 * `
 * ```
 *
 * to
 * ```
 * styled.span`
 *   color: white;
 *   width: 24px;
 *   ::placeholder {
 *    color: red;
 *   }
 * `
 * ```
 */
export function formatStyledTempplateString(body: string): string {
  // format the givven css body with indentation using regex
  const formatted = body
    .split("\n")
    .map((l) => {
      if (l.length < 1) {
        // this is not a style property line. ignore it
        return l;
      } else {
        return `\t${l}`;
      }
    })
    .join("\n");

  // remove linebreaks from the beginning and end of the string, while keeping the indentation
  const trimmed = formatted.replace(/^\n+/, "").replace(/\n+$/, "");

  return trimmed;
}
