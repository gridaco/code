import { TokenNotHandledError } from "@engine/core";
import { CSSProperties } from "@coli.codes/css";
import {
  Background,
  TBackgroundColor,
  BackgroundPaintLike,
} from "@reflect-ui/core";
import { CSSColorOption, color } from "../color";
import { array } from "@reflect-ui/uiutils";
import { Color, GradientType, Alignment } from "@reflect-ui/core";
import { linearGradient } from "../linear-gradient";
import { radialGradient } from "../radial-gradient";
import { url } from "../url";

/**
 * @todo - not implemented
 * @returns
 */
export function background(bg: Background | undefined): CSSProperties {
  if (Array.isArray(bg)) {
    // filter out undefined
    bg = bg?.filter(array.filters.notEmpty);
    return background_multiple(...bg);
  } else {
    return background_single(bg);
  }
}

type CSSBackgroundOption = CSSColorOption & {};

function background_single(
  background: BackgroundPaintLike,
  options?: CSSBackgroundOption
): CSSProperties {
  switch (background.type) {
    case "gradient": {
      switch (background._type) {
        case GradientType.LINEAR: {
          return {
            background: linearGradient(background),
          };
        }
        case GradientType.RADIAL: {
          return {
            background: radialGradient(background),
          };
        }
        default:
          throw new TokenNotHandledError(
            `gradient with type "${background["type"]}" not handled`
          );
      }
    }
    case "solid-color": {
      return {
        "background-color": color(background as Color, options),
      };
    }
    case "image": {
      // TODO:
      // 'background-clip' // todo
      // 'background-size' // todo
      // 'background-repeat' // todo
      // 'background-position' // todo
      return {
        "background-image": url(background.src),
        "object-fit": box_fit_to_object_fit[background.fit],
        "background-repeat": background.repeat,
      };
    }
    default: {
      throw new TokenNotHandledError(`${background.type} not handled`);
    }
  }
  //
}

/**
 * Creates a css background property from multiple backgrounds, using background-size, background-position, background-repeat.
 *
 * Notes:
 * - since the multiple background on css does not support to have multiple object-fit, we use the combination of background-size and background-position to achieve the same effect for cover and contain.
 * - since the rgba (colors with alpha transparency) value is not supported on upper index, we use linear-gradient to achieve the same effect.
 *
 * -
 * @param backgrounds
 * @returns
 */
function background_multiple(
  ...backgrounds: BackgroundPaintLike[]
): CSSProperties {
  const fills = Array(backgrounds.length);
  const sizes = Array(backgrounds.length);
  const repeats = Array(backgrounds.length);
  const positions = Array(backgrounds.length);

  // reverse order
  backgrounds = backgrounds.reverse();

  backgrounds.forEach((bg, i) => {
    const _ = background_single(bg, {
      // don't use named color, so we can check if color contains alpha. value by checking `"rgba"` - see the reason above. - it's not neccessary to set this since alpha color can't be a named color, but to be explicit.
      useNamedColor: false,
    });
    const fill =
      _["background-color"] || _["background-image"] || _["background"];
    const fx_fill = (fill as string).includes("rgba")
      ? linearGradient({
          _type: GradientType.LINEAR,
          begin: Alignment.center,
          end: Alignment.center,
          colors: [bg as TBackgroundColor, bg as TBackgroundColor],
        })
      : fill;
    fills[i] = fx_fill;
    repeats[i] = _["background-repeat"] || "no-repeat";
    const object_fit = _["object-fit"];
    // since css does not support multiple object-fit, we use the combination of background-size and background-position to achieve the same effect for cover and contain.
    const fx_background_size = object_fit == "cover" ? "cover" : "contain";
    sizes[i] = fx_background_size || "auto";
    const fx_position = object_fit == "cover" ? "center" : "center";
    positions[i] = fx_position || "center";
  });

  return {
    background: fills.join(", "),
    "background-repeat": repeats.join(", "),
    "background-size": sizes.join(", "),
    "background-position": positions.join(", "),
  };
}

const box_fit_to_object_fit = {
  contain: "contain",
  cover: "cover",
  fitWidth: "fit-width",
  fitHeight: "fit-height",
  fill: "fill",
  none: "none",
} as const;
