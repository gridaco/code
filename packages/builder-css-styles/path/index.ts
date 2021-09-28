/**
 * [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/path())
 *
 * Syntax: `path( [<fill-rule>,]? <string>)`
 *
 * e.g.
 * ```
 * path("M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80");
 * ```
 *
 */
export function path(d: string) {
  return `path("${d}")`;
}
