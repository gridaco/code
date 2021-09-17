import { CSSProperties } from "@coli.codes/css";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";
import { color } from "../color";
import { array } from "@reflect-ui/uiutils";
/**
 * @todo - not implemented
 * @returns
 */
export function background(bg: BackgroundPaintLike[]): CSSProperties {
  const safebg = bg?.filter(array.filters.notEmpty);
  if (safebg && safebg.length > 0) {
    const _primary = safebg[0];
    return {
      "background-color": color(_primary),
      // 'background-clip' // todo
      // 'background-image' // todo
      // 'background-color' // todo
      // 'background-size' // todo
      // 'background-repeat' // todo
      // 'background-position' // todo
    };
  } else {
    return;
  }
}
