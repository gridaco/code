import { Gradient, GradientType } from "@reflect-ui/core";
import { linearGradient } from "./painting-linear-gradient";
import { radialGradient } from "./painting-radial-gradient";

export function gradient(g: Gradient) {
  switch (g._type) {
    case GradientType.LINEAR: {
      return linearGradient(g);
    }
    case GradientType.RADIAL: {
      return radialGradient(g);
    }
    // case GradientType.DIANOND:
    // case GradientType.ANGULAR:
  }
}
