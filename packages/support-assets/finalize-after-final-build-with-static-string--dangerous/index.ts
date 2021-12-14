type AssetStringReplacementMap =
  | { [key: string]: string }
  | Map<string, string>
  | CustomReplacement;

type CustomReplacement = {
  keys: string[];
  replacer: (key) => string;
};

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
  const _is_custom_replacement = "keys" in assets; // CustomReplacement;
  const get = _is_custom_replacement
    ? (key: string) => (assets as CustomReplacement).replacer(key)
    : (key: string) => assets[key];

  const _replacementkey = (key) => `${prefix || ""}${key}`;

  if (_is_custom_replacement) {
    // we need to replace all keys
    const keys = (assets as CustomReplacement).keys;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const _replacement_key = _replacementkey(key);
      code = code.replace(
        new RegExp(_replacement_key, "g"),
        get(key) || safety.fallback
      );
    }
  } else {
    Object.keys(assets).forEach((key) => {
      const _replacement_key = _replacementkey(key);
      const _replacement_target = get(key) || safety.fallback;
      code = code.replace(
        new RegExp(_replacement_key, "g"),
        _replacement_target
      );
    });
  }
  return code;
}
