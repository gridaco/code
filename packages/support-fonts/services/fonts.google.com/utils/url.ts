import { QueryObject, resolveURL, withQuery, withHttps } from "ufo";

export function constructURL({
  families,
  display,
  subsets,
  text,
}: GoogleFonts = {}): string | false {
  const subset = (Array.isArray(subsets) ? subsets : [subsets]).filter(Boolean);
  const prefix = subset.length > 0 ? "css" : "css2";
  const family = convertFamiliesToArray(families ?? {}, prefix.endsWith("2"));

  if (family.length < 1) {
    return false;
  }

  const query: QueryObject = {
    family,
  };

  if (display && isValidDisplay(display)) {
    query.display = display;
  }

  if (subset.length > 0) {
    query.subset = subset.join(",");
  }

  if (text) {
    query.text = text;
  }

  return withHttps(withQuery(resolveURL(GOOGLE_FONTS_DOMAIN, prefix), query));
}

function convertFamiliesToArray(families: Families, v2 = true): string[] {
  const result: string[] = [];

  // v1
  if (!v2) {
    Object.entries(families).forEach(([name, values]) => {
      if (!name) {
        return;
      }

      name = parseFamilyName(name);

      if (
        (Array.isArray(values) && values.length > 0) ||
        values === true ||
        values === 400
      ) {
        result.push(name);
        return;
      }

      if (values === 700) {
        result.push(`${name}:bold`);
        return;
      }

      if (Object.keys(values).length > 0) {
        const styles: string[] = [];

        Object.entries(values)
          .sort(([styleA], [styleB]) => styleA.localeCompare(styleB))
          .forEach(([style, weight]) => {
            const styleParsed = parseStyle(style);

            if (
              styleParsed === "ital" &&
              (weight === 700 ||
                (Array.isArray(weight) && weight.includes(700)))
            ) {
              styles.push("bolditalic");

              if (Array.isArray(weight) && weight.includes(400)) {
                styles.push(styleParsed);
              }
            } else if (
              styleParsed === "wght" &&
              (weight === 700 ||
                (Array.isArray(weight) && weight.includes(700)))
            ) {
              styles.push("bold");

              if (Array.isArray(weight) && weight.includes(400)) {
                styles.push(styleParsed);
              }
            } else if (weight !== false) {
              styles.push(styleParsed);
            }
          });

        const stylesSortered = styles
          .sort(([styleA], [styleB]) => styleA.localeCompare(styleB))
          .reverse()
          .join(",");

        if (stylesSortered === "wght") {
          result.push(name);
          return;
        }

        result.push(`${name}:${stylesSortered}`);
      }
    });

    return result.length ? [result.join("|")] : result;
  }

  // v2
  if (v2) {
    Object.entries(families).forEach(([name, values]) => {
      if (!name) {
        return;
      }

      name = parseFamilyName(name);

      if (Array.isArray(values) && values.length > 0) {
        result.push(`${name}:wght@${values.join(";")}`);
        return;
      }

      if (Object.keys(values).length > 0) {
        const styles: string[] = [];
        const weights: string[] = [];

        Object.entries(values)
          .sort(([styleA], [styleB]) => styleA.localeCompare(styleB))
          .forEach(([style, weight]) => {
            const styleParsed = parseStyle(style);
            styles.push(styleParsed);

            (Array.isArray(weight) ? weight : [weight]).forEach(
              (value: string | number) => {
                if (
                  Object.keys(values).length === 1 &&
                  styleParsed === "wght"
                ) {
                  weights.push(String(value));
                } else {
                  const index = styleParsed === "wght" ? 0 : 1;
                  weights.push(`${index},${value}`);
                }
              }
            );
          });

        if (!styles.includes("wght")) {
          styles.push("wght");
        }

        const weightsSortered = weights
          .sort(([weightA], [weightB]) => weightA.localeCompare(weightB))
          .join(";");

        result.push(`${name}:${styles.join(",")}@${weightsSortered}`);
        return;
      }

      if (values) {
        result.push(name);
      }
    });
  }

  return result;
}

export const GOOGLE_FONTS_DOMAIN = "fonts.googleapis.com";

export function isValidDisplay(display: string): boolean {
  return ["auto", "block", "swap", "fallback", "optional"].includes(display);
}

export function parseStyle(style: string): string {
  const _style = style.toLowerCase();

  if (["wght", "regular", "normal"].includes(_style)) {
    return "wght";
  }

  if (["i", "italic", "ital"].includes(_style)) {
    return "ital";
  }

  return _style;
}

export function parseFamilyName(name: string) {
  return decodeURIComponent(name).replace(/\+/g, " ");
}

interface FamilyStyles {
  [style: string]: boolean | number | number[];
}

interface Families {
  [family: string]: boolean | number | number[] | FamilyStyles;
}

interface GoogleFonts {
  families?: Families;
  display?: string;
  subsets?: string[] | string;
  text?: string;
}
