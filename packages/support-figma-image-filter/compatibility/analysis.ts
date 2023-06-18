import { Figma } from "@design-sdk/figma-types";

type FigmaImageFilterProperty =
  | "exposure"
  | "contrast"
  | "saturation"
  | "temperature"
  | "tint"
  | "highlights"
  | "shadows";

interface ImageFilterCompatibilityAnalysisOptions {
  /**
   * Rather to allow value margin. if specified, it will try to ignore the property with this margin applied.
   * The Figma's ImageFilter can't be handled accurately, so with this option, you can tell the engine to ignore certain image filter property with small tints.
   *
   * e.g. if `ignore_property_with_margin` is 0.1, and the value is 0.9, it will ignore the property, regarding the value as 0. (the value from Figma ImageFilter is between -1 ~ 1)
   *
   * The value will ve used for `allowed` properties, if you wish to override this, you can pass the object with property name as key and value as value.
   *
   * ```ts
   * // Example
   * ignore_property_with_margin: {
   *   contrast: null, // or any other number
   * }
   * ```
   *
   * @default 0.2
   */
  ignore_property_with_margin?:
    | number
    | null
    | { [key in FigmaImageFilterProperty]?: number | null };
  /**
   * None of the image filters are applicapable with 100% accuracy. Yet, you can get the similar result using standard image filters. If you with to allow this for certain properties, you can specify the property name here.
   * You can use this to override compatibility of the property defined by {@link platform_image_filter_property_compatibility_map}
   *
   * @default {contrast: true, saturation: true}
   */
  allowed?: { [key in FigmaImageFilterProperty]?: boolean };
  /**
   * Run the analysis for compatibility on specific platform.
   */
  platform: "flutter" | "css";
}

const platform_image_filter_property_compatibility_map = {
  flutter: {
    exposure: false,
    contrast: true,
    saturation: true,
    temperature: false,
    tint: false,
    highlights: false,
    shadows: false,
  },
  css: {
    exposure: false,
    contrast: true,
    saturation: true,
    temperature: false,
    tint: false,
    highlights: false,
    shadows: false,
  },
} as const;

type ImageFilterCompatibilityReason = {
  [property: string]: {
    /**
     * the value from Figma ImageFilter, as is. -1 ~ 1
     */
    value: number;
    /**
     * If the property is compatible (ignored or allowed)
     */
    compatible: boolean;
    /**
     * If the value is ignored (none or 0 (with margin applied))
     */
    ignored: boolean;
    /**
     * If the value is allowed by the platform or by user's option input
     */
    allowed: boolean;
  };
};

interface ImageFilterCompatibilityAnalysisResult {
  analysis?: ReadonlyArray<ImageFilterCompatibilityReason>;
  compatible: boolean;
}

const default_analysis_options: Omit<
  ImageFilterCompatibilityAnalysisOptions,
  "platform"
> = {
  ignore_property_with_margin: 0.2,
  allowed: {
    contrast: true,
    saturation: true,
  },
};

/**
 * Since the Figma's ImageFilters are not direcly compatible with CSS or Flutter (or any other frameworks), we need to analyze the compatibility and provide the best possible result.
 * @param paint
 * @param options
 * @returns
 */
export function image_paint_filter_compatibility_analysis(
  paint: Figma.ImagePaint,
  options: ImageFilterCompatibilityAnalysisOptions
): ImageFilterCompatibilityAnalysisResult {
  options = {
    ...default_analysis_options,
    ...options,
  };

  let isCompatible = true;
  const analysis: ImageFilterCompatibilityReason[] = [];

  if (paint.filters) {
    // An array of all properties
    const properties: FigmaImageFilterProperty[] = [
      "exposure",
      "contrast",
      "saturation",
      "temperature",
      "tint",
      "highlights",
      "shadows",
    ];

    // Iterate over each property
    properties.forEach((property) => {
      const value = paint.filters[property];
      const ignoredMargin =
        options.ignore_property_with_margin instanceof Object
          ? options.ignore_property_with_margin[property] || 0
          : options.ignore_property_with_margin;
      const ignored = Math.abs(value) <= ignoredMargin;
      const compatibleFromMap =
        platform_image_filter_property_compatibility_map[options.platform][
          property
        ];
      const allowed =
        options.allowed[property] !== undefined
          ? options.allowed[property]
          : compatibleFromMap;
      const compatible = allowed || ignored;

      // If not compatible and not ignored, overall compatibility is false
      if (!compatible) {
        isCompatible = false;
      }

      analysis.push({
        [property]: {
          value,
          compatible,
          ignored,
          allowed,
        },
      });
    });
  }

  return {
    compatible: isCompatible,
    analysis,
  };
}
