import { k } from "@web-builder/core";

export function fontFamily(
  family: string[] | string,
  options?: {
    no_fallback: boolean;
  }
): string {
  if (!family) {
    return;
  }

  const _fallbacks = options?.no_fallback
    ? []
    : [k.default_generic_fallback_font_family];

  return (Array.isArray(family) ? family : [family])
    .concat(_fallbacks)
    .map((item) => {
      // if Helvetica Nueue, replace with "Helvetica Nueue"
      if (item.includes(" ")) {
        return `"${item}"`;
      }
      return item;
    })
    .join(", ");
}
