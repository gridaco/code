import { CSSProperties } from "@coli.codes/css";
import { Background } from "@reflect-ui/core/lib/background";
import { color } from "../color";
import { array } from "@reflect-ui/uiutils";
import { Color } from "@reflect-ui/core";
/**
 * @todo - not implemented
 * @returns
 */
export function background(bg: Background): CSSProperties {
  let _primary: Color;
  if (Array.isArray(bg)) {
    const safebg = bg?.filter(array.filters.notEmpty);
    _primary = safebg[0];
  } else {
    _primary = bg;
  }
  if (_primary) {
    return {
      "background-color": color(_primary),
      // 'background-clip' // todo
      // 'background-image' // todo
      // 'background-color' // todo
      // 'background-size' // todo
      // 'background-repeat' // todo
      // 'background-position' // todo
    };
  }
}
