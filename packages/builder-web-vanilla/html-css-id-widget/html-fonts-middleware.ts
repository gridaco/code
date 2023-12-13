import { TFontService, fonts } from "@code-features/fonts";
import type { HtmlIdCssModuleBuilder } from "./html-css-id-module-builder";

export function htmlFontsMiddleware(
  builder: HtmlIdCssModuleBuilder,
  services: ReadonlyArray<TFontService>
) {
  try {
    // TODO: we need better way to get used fonts.
    const styles = builder.partStyles();

    // parse lines with "font-family: ..."
    const matches = styles.match(/font-family:.*?;/g);
    if (!matches) {
      return;
    } else {
      const font_families = matches
        .map((m) => {
          return m
            .replace(/font-family:/, "")
            .replace(/;/, "")
            .trim()
            .split(",")
            .map((f) => f.trim().replace(/"/g, "").replace(/'/g, "").trim());
        })
        .flat()
        .filter((f) => f.length > 0)
        .filter(
          (f) =>
            f !== "inherit" &&
            f !== "initial" &&
            f !== "unset" &&
            f !== "serif" &&
            f !== "sans-serif" &&
            f !== "monospace" &&
            f !== "cursive" &&
            f !== "fantasy" &&
            f !== "system-ui"
        );

      const resolved = fonts({
        fonts: font_families,
        resolution: "fonts.googleapis.com/css2",
        services,
      });

      // create <link> tag for each font, which is going to be added to <head> tag.
      const links = [
        `<link rel="preconnect" href="https://fonts.googleapis.com">`,
        `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
        ...Object.keys(resolved).map((f) => {
          const { urls } = resolved[f];
          return `<link rel="stylesheet" href="${urls["*"]}">`;
        }),
      ];

      builder.head(...links);
    }
  } catch (e) {
    console.error(`error while resolving fonts from [${services.join(",")}]`);
  }
}
