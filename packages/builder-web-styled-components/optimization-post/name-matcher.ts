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
  matcher: NameMatchStrategy
) {
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
