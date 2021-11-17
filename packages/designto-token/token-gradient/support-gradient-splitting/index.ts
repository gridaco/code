import { Figma } from "@design-sdk/figma-types";
// WIP
// TODO:
export function splitGradient(gradient: Figma.GradientPaint) {
  const containsAlphaStop = gradient.gradientStops.some((g) => {
    return g.color.a !== 1;
  });

  if (containsAlphaStop) {
    // linear-gradient(d, rgba(c1.r, c1.g, c1.b, c1.a), c2)
    // linear-gradient(d, rgba(c2.r, c2.g, c2.g, c1.a), c2);
  } else {
    return gradient;
  }
}
