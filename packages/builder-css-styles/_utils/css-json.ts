///
/// css to js transformer
/// reference:
/// - https://github.com/postcss/postcss-js/blob/main/objectifier.js
///
import { CSSProperties } from "@coli.codes/css";
import camel from "camelcase-css";

/**
 * convertes standard css object to react acceptable camel case object
 *
 *
 * ```js
 * // from
 * {
 *    "background-color": "red",
 * }
 * // to
 * {
 *    backgroundColor: "red",
 * }
 * ```
 * @param payload
 */
export function cssToJson(
  payload: CSSProperties,
  options?: {
    camelcase?: boolean;
  }
) {
  const obj = Object.keys(payload).reduce(function (previous, key) {
    // handle option "camelcase"
    key = options?.camelcase ? camel(key) : key;

    return {
      ...previous,
      [key]: payload[key],
    };
  }, {});
  return JSON.parse(JSON.stringify(obj));
}
