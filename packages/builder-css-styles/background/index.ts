import { CSSProperties } from "@coli.codes/css";
import {
  Background,
  BackgroundPaintLike,
} from "@reflect-ui/core/lib/background";
import { color } from "../color";
import { array } from "@reflect-ui/uiutils";
import {
  Color,
  GradientType,
  GradientGroup,
  LinearGradientGroup,
  RadialGradientGroup,
} from "@reflect-ui/core";
import { linearGradient, radialGradient } from "../gradient";

/**
 * @todo - not implemented
 * @returns
 */
export function background(bg: Background): CSSProperties {
  let _primary: BackgroundPaintLike;
  if (Array.isArray(bg)) {
    const safebg = bg?.filter(array.filters.notEmpty);
    _primary = safebg[0];
  } else {
    _primary = bg;
  }
  if (_primary) {
    switch (_primary.type) {
      case "gradient": {
        return {
          background: _handle_gradient_bg(_primary.gradient),
        };
      }
      case "solid-color": {
        return {
          "background-color": color(_primary as Color),
          // 'background-clip' // todo
          // 'background-image' // todo
          // 'background-color' // todo
          // 'background-size' // todo
          // 'background-repeat' // todo
          // 'background-position' // todo
        };
      }
      case "graphics": {
        throw "graphics bg not supported";
      }
    }
  }
}

function _handle_gradient_bg(g: GradientGroup): string {
  let type: GradientType;
  if (Array.isArray(g)) {
    type = g[0]?._type;
  }

  switch (type) {
    case GradientType.LINEAR: {
      return linearGradient(g as LinearGradientGroup);
    }
    case GradientType.RADIAL: {
      return radialGradient(g as RadialGradientGroup);
    }
    default:
      console.error(
        "other than linear, radial gradient is not supported yet.",
        g
      );
  }
}
