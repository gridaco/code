import { googlefont } from "./services/fonts.google.com";
import { systemfont } from "./services/system";

export type TFontService = "system" | "fonts.google.com";

type FontResolutions = {
  [family: string]: {
    resolution: TFontResulution;
    service: TFontService;
    urls: ReadonlyArray<string>;
  };
};

type TFontResulution = "font-face" | "link";

const providers = {
  "fonts.google.com": googlefont,
  system: systemfont,
} as const;

/**
 * resolve fonts from services
 */
export function fonts({
  fonts,
  services,
  resolution,
}: {
  fonts: ReadonlyArray<string>;
  services: ReadonlyArray<TFontService>;
  resolution: TFontResulution;
}): FontResolutions {
  const result: FontResolutions = {};

  const resolvers = services.map((service) => {
    return providers[service];
  });
  for (const font of fonts) {
    for (const resolver of resolvers) {
      const resolved = resolver(font);
      if (resolved) {
        result[font] = {
          resolution,
          ...resolved,
          urls: [], // TODO:
        };
        break;
      }
    }
  }

  return result;
}
