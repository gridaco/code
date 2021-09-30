type AssetStringReplacementMap = { [key: string]: string };

/**
 * this replaces the asset strings in the given string with the given map
 * since it replaces all dynamic occurrences, it is not fully safe to use.
 * (we use very complex special keys for indicating assets though)
 *
 * Note: This is not fully safe to use.
 * @param code
 * @param assets
 * @returns
 */
export function finalize_temporary_assets_with_static_string_keys__dangerously(
  code: string,
  assets: AssetStringReplacementMap,
  safety: {
    fallback: string;
  }
) {
  finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
    code,
    false,
    assets,
    safety
  );
}

/**
 * this replaces the asset strings in the given string with the given map
 * since it replaces all dynamic occurrences, it is not fully safe to use.
 * (we use very complex special keys for indicating assets though)
 *
 * the prefix shall be provided as a parameter, the map shall contain keys without prefix.
 * It's basically same as {@link finalize_temporary_assets_with_static_string_keys__dangerously}, but with prefix provided explicitly.
 *
 * Note: This is not fully safe to use.
 * @param code
 * @param assets
 * @returns
 */
export function finalize_temporary_assets_with_prefixed_static_string_keys__dangerously(
  code: string,
  prefix: string | false,
  assets: AssetStringReplacementMap,
  safety: {
    fallback: string;
  }
) {
  Object.keys(assets).forEach((key) => {
    code = code.replace(
      new RegExp(`${prefix || ""}${key}`, "g"),
      assets[key] || safety.fallback
    );
  });
  return code;
}
