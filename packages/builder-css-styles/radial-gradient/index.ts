import { RadialGradientManifest } from "@reflect-ui/core";
import { CSSProperty } from "@coli.codes/css";
import { color } from "../color";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient()
 *
 * @param g
 * @returns
 */
export function radialGradient(g: RadialGradientManifest): CSSProperty.Color {
  // throw "css gradient not ready";
  // TODO:
  // 1. stops support
  // 2. angle support
  var angleDeg =
    (Math.atan2(g.begin.y - g.end.y, g.begin.x - g.end.x) * 180) / Math.PI;

  const colors = g.colors.map(color).join(", ");
  return `radial-gradient(${colors})`;
}
