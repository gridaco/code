import { LinearGradientManifest } from "@reflect-ui/core";
import { CSSProperty } from "@coli.codes/css";
import { color } from "../color";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient()
 *
 * TODO:
 * - [ ] stops support (position)
 *
 * @param g
 * @returns
 */
export function linearGradient(g: LinearGradientManifest): CSSProperty.Color {
  const angle =
    (Math.atan2(g.begin.y - g.end.y, g.begin.x - g.end.x) * 180) / Math.PI;

  const gradient_angle =
    angle +
    // when the rotation value is 0, it means the gradient direction is left to right, which in css, it is 90deg.
    // so we have to subtract 90.
    // TODO: consider: extract this outside of the styles module?
    -90;

  const colors = g.colors.map(color).join(", ");
  return `linear-gradient(${gradient_angle}deg, ${colors})`;
}
