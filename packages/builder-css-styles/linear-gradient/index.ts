// TODO: remove figma dependency
import { Figma } from "@design-sdk/figma-types";
import { color } from "../color";

/**
 * WIP
 * @param g
 * @returns
 */
export function linearGradient(g: Figma.GradientPaint) {
  return `linear-gradient(0deg, ${g.gradientStops
    .map((s) => `${color(s.color)} ${s.position * 100}%`)
    .join(", ")})`;
}
