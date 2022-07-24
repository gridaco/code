/**
 * @param comment <!-- content --> format markdown comment
 *
 * @example
 * ```html
 * <!-- grida.meta.widget_declaration | engine: v2022.1.0 | source: ${id} | uri: ${resource-uri} -->
 * ```
 *
 * yields
 *
 * ```json
 * {
 *    "grida.meta.widget_declaration": true,
 *    "engine": "v2022.1.0",
 *    "uri": "https://grida.co/files/xxx/yyy",
 *    "source": "${id}"
 * }
 * ```
 */
export function parseMetaFromMarkdownComment<
  T extends { [key: string]: string | boolean } | object
>(comment: string): T {
  // transform below e.g.:
  // <!-- grida.meta.widget_declaration | engine: v2022.1.0 | source: ${id} | uri: ${resource-uri} -->
  // to { engine: "v2022.1.0", uri: "https://grida.co/files/xxx/yyy", source: "${id}" }
  // 1. split fields with `|`
  // 2. split fields with `:` as in key:value (ignore spaces around `:` -> ` : ` -> ok)
  // 3. return as object

  const fields = comment.split("|");
  const meta = {};
  for (const field of fields) {
    if (field.includes(":")) {
      const [key, value] = field.split(/\s*:\s*/);
      meta[key] = value;
    } else {
      const __meta = field.trim();
      meta[__meta] = true;
    }
  }

  return meta as T;
}

/**
 * creates markdown meta string from json
 *
 * - boolean value: -> e.g. `"on": true` -> `... | a | ...`
 * - string value: -> e.g. `"name": "grida.co"` -> `... | name : grida.co | ...`
 *
 * @example
 *
 * ```json
 * {"on": true, "name": "grida.co", "createdat": "2022-12-25"}
 * ```
 *
 * yields
 *
 * ```html
 * <!-- on | name : grida.co | createdat: 2022-12-25 -->
 * ```
 *
 * @param meta
 * @returns
 */
export function makeMarkdownCommentFromMeta<
  T extends { [key: string]: string | boolean } | object
>(meta: T): string {
  const flags: string[] = [];
  const fields: string[] = [];

  Object.keys(meta).forEach((k) => {
    const v = meta[k];
    if (typeof v === "boolean" && v) {
      flags.push(k);
    } else {
      if (v) {
        fields.push(`${k} : ${v}`);
      }
    }
  });

  const items = [...flags, ...fields];

  return `<!-- ${items.join(" | ")} -->`;
}

const _ = {
  encode: makeMarkdownCommentFromMeta,
  decode: parseMetaFromMarkdownComment,
};

export default _;
