///
/// General duplicated style optimization.
/// this is based on static rule, based on the names of the layer and styles.
///

import type { ElementCssStyleData } from "@coli.codes/css";

/// 1. based on final built style
/// 2. based on pre-build style comparison
/// - suggesting the merged style name

interface MinimalStyleRepresenation {
  name: string;
  style: ElementCssStyleData;
}

type NameMatcher =
  // /**
  //  * provide a custom regex to compare two names
  //  */
  // | "custom-regex";
  /**
   * match exactly
   */
  | "exact"
  /**
   * allow matching with numbered suffix
   * e.g.
   * - 'Wrapper' = 'Wrapper1'
   * - 'Container1' = 'Container2'
   * - 'View' = 'View_001' = 'View_002'
   */
  | "suffix-number"
  /**
   * allow matching with separator (.-_) with following numbered suffix
   * e.g.
   * - 'Wrapper' = 'Wrapper-1'
   * - 'Container' = 'Container.2'
   * - 'View' = 'View_001' = 'View_002'
   */
  | "suffix-separator-number";

function is_matching_name(a: string, b: string, matcher: NameMatcher) {
  switch (matcher) {
    case "exact":
      return a === b;
    case "suffix-number": {
      // the suffix is optional.
      // yes: 'Wrapper' = 'Wrapper1' = 'Wrapper2' = 'Wrapper002'
      // no: 'Wrapper' !== 'Wrapper_001' !== 'Wrapper_A' !== 'Wrapper_A'

      if (a.includes(b)) {
        const suffix = a.replace(b, "");
        return /(\d+)/.test(suffix);
      } else if (b.includes(a)) {
        const suffix = b.replace(a, "");
        return /(\d+)/.test(suffix);
      } else {
        return false;
      }
    }

    case "suffix-separator-number":
      // allowed spearator is .. '.', '-', '_'
      // yes: 'Wrapper' = 'Wrapper-1' = 'Wrapper.2' = 'Wrapper_001'
      // no: 'Wrapper' !== 'Wrapper1' !== 'Wrapper2' !== 'Wrapper_A' !== 'Wrapper_A'

      if (a.includes(b)) {
        const suffix = a.replace(b, "");
        return /^((\-|\.|\_)?\d+)$/.test(suffix);
      } else if (b.includes(a)) {
        const suffix = b.replace(a, "");
        return /^((\-|\.|\_)?\d+)$/.test(suffix);
      }
      return false;
  }
}

/**
 * returns boolean based on input's name and style data. if both matches, return true.
 * @param a 1st element
 * @param b 2nd element
 * @param options
 * @returns
 */
export function is_duplicate_by_name_and_style(
  a: MinimalStyleRepresenation,
  b: MinimalStyleRepresenation,
  options: {
    name_match: NameMatcher;
  }
) {
  // name should be the same
  if (!is_matching_name(a.name, b.name, options.name_match)) {
    return false;
  }

  // style should be the same
  return JSON.stringify(a.style) === JSON.stringify(b.style);
}
