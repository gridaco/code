import type { HtmlMeta } from "./html-meta";

export type { HtmlMeta };

/**
 * @param meta user customizable meta data object
 *
 * @example
 * ```ts
 *
 * const meta = {
 *  title: "hello",
 *  description: "world",
 *  robots: ["index", "follow"],
 *  googlebot: ["index", "follow"],
 *  keywords: ["hello", "world"],
 *  author: "Grida Code",
 *  viewport: "width=device-width, initial-scale=1.0",
 * }
 *
 * const contents = stringfy(meta)
 *
 * console.log(contents)
 *
 * // <meta charset="utf-8">
 * // <title>hello</title>
 * // <meta name="description" content="world">
 * // <meta name="robots" content="index,follow">
 * // <meta name="googlebot" content="index,follow">
 * // <meta name="keywords" content="hello,world">
 * // <meta name="author" content="Grida Code">
 * // <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *
 * ```
 */
export function stringfy(
  meta: HtmlMeta,
  {
    use_default_charset,
    join,
    defaults,
  }: {
    use_default_charset?: boolean;
    join?: string;
    /**
     * @deprecated not supported yet
     */
    defaults?: Partial<HtmlMeta>;
  } = {
    use_default_charset: true,
    join: "\n",
    defaults: {},
  }
) {
  const inlinemeta = (keyval: { [key: string]: string }) =>
    `<meta ${Object.entries(keyval)
      .map(([key, val]) => `${key}="${val}"`)
      .join(" ")}>`;

  const inlinecontent = (v: string[] | string) =>
    Array.isArray(v) ? v.join(",") : v;

  const __title = meta.title ? `<title>${meta.title}</title>` : undefined;

  const __charset =
    meta.charset || use_default_charset
      ? inlinemeta({ charset: meta.charset ?? "utf-8" })
      : undefined;

  const __description = meta.description
    ? inlinemeta({ name: "description", content: meta.description })
    : undefined;

  const __robots = meta.robots
    ? inlinemeta({
        name: "robots",
        content: inlinecontent(meta.robots),
      })
    : undefined;

  const __googlebot = meta.googlebot
    ? inlinemeta({
        name: "googlebot",
        content: inlinecontent(meta.googlebot),
      })
    : undefined;

  const __keywords = meta.keywords
    ? inlinemeta({
        name: "keywords",
        content: inlinecontent(meta.keywords),
      })
    : undefined;

  const __author = meta.author
    ? inlinemeta({
        name: "author",
        content: meta.author,
      })
    : undefined;

  const __viewport = meta.viewport
    ? inlinemeta({
        name: "viewport",
        content: meta.viewport,
      })
    : undefined;

  const metas = [
    __charset,
    __title,
    __description,
    __robots,
    __googlebot,
    __keywords,
    __author,
    __viewport,
  ].filter((v) => v !== undefined);

  return metas.join(join);
}
