import { CSSProperties, CSSProperty } from "@coli.codes/css";
import { px } from "../dimensions";

/**
 * [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset())
 *
 * Syntax: `t | r | b | l | "round" | radius`
 *
 * ```css
 * inset(42px 63px 50px 39px round 73px)
 * ```
 *
 * @param param0
 * @returns
 */
export function inset({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  radius = 0,
}: {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  radius?: number;
}): CSSProperty.ClipPath {
  if (radius) {
    return `inset ${px(top)} ${px(right)} ${px(bottom)} ${px(
      left
    )} round ${radius}`;
  }
  return `inset ${px(top)} ${px(right)} ${px(bottom)} ${px(left)}`;
}
