import { CSSProperties } from "@coli.codes/css";
import {
  BorderRadiusManifest,
  isCircularRadius,
  isEllipticalRadius,
  isRadius,
} from "@reflect-ui/core";
import { px } from "..";

/**
 * border radius css from BorderRadiusManifest
 * 
 * [mdn:border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
 * 
 * [border radius by shape](https://css-tricks.com/the-shapes-of-css/)
 * 
 * ```css
# The syntax of the first radius allows one to four values 
# Radius is set for all 4 sides 
border-radius: 10px;

# top-left-and-bottom-right | top-right-and-bottom-left 
border-radius: 10px 5%;

# top-left | top-right-and-bottom-left | bottom-right 
border-radius: 2px 4px 2px;

# top-left | top-right | bottom-right | bottom-left
border-radius: 1px 0 3px 4px;

# The syntax of the second radius allows one to four values
# (first radius values) / radius
border-radius: 10px / 20px;

# (first radius values) / top-left-and-bottom-right | top-right-and-bottom-left
border-radius: 10px 5% / 20px 30px;

# (first radius values) / top-left | top-right-and-bottom-left | bottom-right
border-radius: 10px 5px 2em / 20px 25px 30%;

# (first radius values) / top-left | top-right | bottom-right | bottom-left
border-radius: 10px 5% / 20px 25em 30px 35em;

# Global values
border-radius: inherit;
border-radius: initial;
border-radius: revert;
border-radius: unset;
 * ```
 * @param r
 * @returns
 */
export function borderRadius(
  r: BorderRadiusManifest | undefined
): CSSProperties | undefined {
  if (!r) {
    return;
  }
  if (r.all) {
    if (isCircularRadius(r.all)) {
      return {
        "border-radius": px(r.all),
      };
    } else {
      // example - https://codepen.io/Mahe76/pen/ExZbdro
      return {
        "border-radius": `${px(r.all.x)} / ${px(r.all.y)}`,
      };
      // TODO: support short handed version - `50%`
    }
  } else {
    if (equal(r.tl, r.tl, r.br, r.bl)) {
      return {
        "border-radius": nonzero(r.tl) && px(r.tl as number),
      };
    }
    // TODO: support other short versions
    return {
      "border-top-left-radius": nonzero(r.tl) && px(r.tl as number),
      "border-top-right-radius": nonzero(r.tr) && px(r.tr as number),
      "border-bottom-right-radius": nonzero(r.br) && px(r.br as number),
      "border-bottom-left-radius": nonzero(r.bl) && px(r.bl as number),
    };
  }
}

const nonzero = (n: any) => typeof n == "number" && n > 0;

const equal = (...n: any[]) => n.every((v) => v === n[0]);
