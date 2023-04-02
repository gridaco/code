import type { WidgetStyleConfigMap } from "@web-builder/core/builders";
import {
  is_duplicate_by_name_and_style,
  find_duplication_in,
  MinimalCssStyleRepresenationForCssPostOptimization,
} from "./duplicated-style-optimization";
import type { DuplicationReductionMap } from "@web-builder/core/builders/styles-repository";

/**
 * Creates the duplication reduction map
 * @param map
 * @returns
 */
export function create_duplication_reduction_map(
  map: WidgetStyleConfigMap
): DuplicationReductionMap {
  const duplication_proxy_map = new Map<string, string>();

  const items: Array<MinimalCssStyleRepresenationForCssPostOptimization> =
    Array.from(map.keys())
      .map((id) => {
        const r = map.get(id)!;
        if ("style" in r) {
          return {
            id: id,
            name: r.tag.name,
            style: r.style,
          };
        }
      })
      // remove empty (without style)
      .filter(
        Boolean
      ) as Array<MinimalCssStyleRepresenationForCssPostOptimization>;

  //
  for (const [id, config] of map) {
    if ("style" in config) {
      // style, id, name
      const _id = id;
      const _style = config.style;
      const _name = config.tag.name; // fixme: this only works for styled-components (need access to origin name)

      // check for duplications
      const dup = find_duplication_in(
        // A
        {
          id: _id,
          name: _name,
          style: _style,
        },
        items
          .filter((d) => d.id !== _id) // renmove current target
          // TODO: is this right?
          // TODO: support multi proxying
          .filter(
            (d) => !Array.from(duplication_proxy_map.values()).includes(d.id)
          ), // remove already proxied items
        //
        is_duplicate_by_name_and_style,
        {
          name_match: ["exact", "suffix-number", "suffix-separator-number"],
        }
      );

      if (dup) {
        duplication_proxy_map.set(dup.id, _id);
      }
    }
  }

  // merge two maps, "map" and "optimized_map" use map as a base, ovverride with optimized_map's values if exists
  const fmap: DuplicationReductionMap = new Map(map);
  for (const [a, b] of duplication_proxy_map) {
    fmap.set(a, { type: "proxy", to: b });
  }

  // console.log(
  //   "optimized with",
  //   duplication_proxy_map,
  //   "final result is..",
  //   fmap
  // );

  return fmap;
}
