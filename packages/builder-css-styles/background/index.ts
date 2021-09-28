import { CSSProperties } from "@coli.codes/css";
import {
  Background,
  BackgroundPaintLike,
} from "@reflect-ui/core/lib/background";
import { color } from "../color";
import { array } from "@reflect-ui/uiutils";
import { Color, GradientType } from "@reflect-ui/core";
import { linearGradient } from "../linear-gradient";

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
        switch (_primary._type) {
          case GradientType.LINEAR: {
            return {
              background: linearGradient(_primary),
            };
          }
          default:
            throw "other than linear-gradient is not supported yet.";
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
      case "graphics": {
        throw "graphics bg not supported";
      }
    }
  }
}
