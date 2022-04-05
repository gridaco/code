export type NameMatchStrategy =
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

export function is_matching_name(
  a: string,
  b: string,
  matcher: NameMatchStrategy | NameMatchStrategy[]
) {
  for (const match of Array.isArray(matcher) ? matcher : [matcher]) {
    switch (match) {
      case "exact":
        if (a === b) return true;
      case "suffix-number": {
        // the suffix is optional.
        // yes: 'Wrapper' = 'Wrapper1' = 'Wrapper2' = 'Wrapper002'
        // no: 'Wrapper' !== 'Wrapper_001' !== 'Wrapper_A' !== 'Wrapper_A'

        // 1. remove the suffix number from both strings
        const a_no_suffix = a.replace(/\d+$/, "");
        const b_no_suffix = b.replace(/\d+$/, "");

        // 2. if no-suffix value is same, then it's a match
        if (a_no_suffix === b_no_suffix) return true;
      }

      case "suffix-separator-number":
        // allowed spearator is .. '.', '-', '_'
        // yes: 'Wrapper' = 'Wrapper-1' = 'Wrapper.2' = 'Wrapper_001'
        // no: 'Wrapper' !== 'Wrapper1' !== 'Wrapper2' !== 'Wrapper_A' !== 'Wrapper_A'

        if (a.includes(b)) {
          const suffix = a.replace(b, "");
          if (/^((\-|\.|\_)?\d+)$/.test(suffix)) return true;
        } else if (b.includes(a)) {
          const suffix = b.replace(a, "");
          if (/^((\-|\.|\_)?\d+)$/.test(suffix)) return true;
        }
    }
  }
  return false;
}
