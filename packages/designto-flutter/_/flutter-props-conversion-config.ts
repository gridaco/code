export interface FlutterPropConversionConfig {
  explicit_default: boolean;
}

/**
 *
 * **Usage**
 * - 1. config only `do_explicitly_specify(config) => true | false`
 * - 2. config + v  `do_explicitly_specify(config, v) => v | undefined`
 * @param c
 * @param v
 * @returns
 */
export function do_explicitly_specify<T = boolean>(
  c?: FlutterPropConversionConfig,
  v?: T
): T | undefined {
  const do_specify = c?.explicit_default === true;
  if (v) {
    if (do_specify) {
      return v;
    } else {
      return undefined;
    }
  }
  return ((do_specify as boolean) as any) as T;
}
