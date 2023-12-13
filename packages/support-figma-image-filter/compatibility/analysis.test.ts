import { Figma } from "@design-sdk/figma-types";
import { image_paint_filter_compatibility_analysis } from "./analysis";

const paint_no_filter: Figma.ImagePaint = {
  type: "IMAGE",
  scaleMode: "FILL",
  imageHash: "somehash",
};

const paint_all_0: Figma.ImagePaint = {
  type: "IMAGE",
  scaleMode: "FILL",
  imageHash: "somehash",
  filters: {
    exposure: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    tint: 0,
    highlights: 0,
    shadows: 0,
  },
};

const paint_all_1: Figma.ImagePaint = {
  type: "IMAGE",
  scaleMode: "FILL",
  imageHash: "somehash",
  filters: {
    exposure: 1,
    contrast: 1,
    saturation: 1,
    temperature: 1,
    tint: 1,
    highlights: 1,
    shadows: 1,
  },
};

const paint_w_contrast: Figma.ImagePaint = {
  type: "IMAGE",
  scaleMode: "FILL",
  imageHash: "somehash",
  filters: {
    exposure: 0,
    contrast: 1,
    saturation: 0,
    temperature: 0,
    tint: 0,
    highlights: 0,
    shadows: 0,
  },
};

const paint_w_shadow: Figma.ImagePaint = {
  type: "IMAGE",
  scaleMode: "FILL",
  imageHash: "somehash",
  filters: {
    exposure: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    tint: 0,
    highlights: 0,
    shadows: 1,
  },
};

describe("Image filter compatibility analysis", () => {
  test("No Image Filter, CSS platform", () => {
    const result = image_paint_filter_compatibility_analysis(paint_no_filter, {
      platform: "css",
    });
    expect(result.compatible).toBeTruthy();
  });

  test("All properties are 0, CSS platform", () => {
    const result = image_paint_filter_compatibility_analysis(paint_all_0, {
      platform: "css",
    });
    expect(result.compatible).toBeTruthy();
  });

  test("All properties are 1, CSS platform", () => {
    const result = image_paint_filter_compatibility_analysis(paint_all_1, {
      platform: "css",
    });
    expect(result.compatible).toBeFalsy();
  });

  test("Only Contrast is applied, CSS platform", () => {
    const result = image_paint_filter_compatibility_analysis(paint_w_contrast, {
      platform: "css",
    });
    expect(result.compatible).toBeTruthy();
  });

  test("Only Shadow is applied, CSS platform.", () => {
    const result = image_paint_filter_compatibility_analysis(paint_w_shadow, {
      platform: "css",
    });
    expect(result.compatible).toBeFalsy();
  });

  test("Only Shadow is applied, CSS platform, shadow is overrided as allowed", () => {
    const result = image_paint_filter_compatibility_analysis(paint_w_shadow, {
      allowed: {
        shadows: true,
      },
      platform: "css",
    });
    expect(result.compatible).toBeTruthy();
  });
});
