import { TokenNotHandledError } from "@engine/core";
import { CSSProperties } from "@coli.codes/css";
import { Background, BackgroundPaintLike } from "@reflect-ui/core";
import { color } from "../color";
import { array } from "@reflect-ui/uiutils";
import { Color, GradientType } from "@reflect-ui/core";
import { linearGradient } from "../linear-gradient";
import { radialGradient } from "../radial-gradient";

/**
 * @todo - not implemented
 * @returns
 */
export function background(bg: Background | undefined): CSSProperties {
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
        switch (_primary._type) {
          case GradientType.LINEAR: {
            return {
              background: linearGradient(_primary),
            };
          }
          case GradientType.RADIAL: {
            return {
              background: radialGradient(_primary),
            };
          }
          default:
            console.error(
              "other than linear, radial gradient is not supported yet.",
              _primary
            );
        }
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
      case "image": {
        // TODO:
        throw "image bg not supported";
      }
      default: {
        throw new TokenNotHandledError(`${_primary.type} not handled`);
      }
    }
  }
}
