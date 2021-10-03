export interface FlutterPropConversionConfig {
  explicit_default: boolean;
}

export function do_explicitly_specify(
  c?: FlutterPropConversionConfig
): boolean {
  return c?.explicit_default === true;
}
