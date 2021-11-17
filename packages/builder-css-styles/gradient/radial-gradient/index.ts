import { RadialGradientManifest } from "@reflect-ui/core";
import { CSSProperty } from "@coli.codes/css";
import { color } from "../../color";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient()
 *
 * @param g
 * @returns
 */
export function radialGradient(
  g: RadialGradientManifest | RadialGradientManifest[]
): CSSProperty.Color {
  if (Array.isArray(g)) {
    return g.map(radialGradient).join(", ");
  }

  // TODO:
  // 1. center support
  // 2. radius support

  const colors = g.colors.map(color).join(", ");
  return `radial-gradient(${colors})`;
}
