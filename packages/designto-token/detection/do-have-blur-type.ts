import { Effect } from "@design-sdk/figma-types";
import { BlurEffect } from "@reflect-ui/core/lib/cgr/effects";

export function hasBlurType(effect: Effect): BlurEffect {
  if (effect.type === "LAYER_BLUR" || effect.type === "BACKGROUND_BLUR") {
    return effect;
  }
}

export function hasLayerBlurType(effect: BlurEffect): boolean {
  return effect.type === "LAYER_BLUR";
}

export function hasBackgroundBlurType(effect: BlurEffect): boolean {
  return effect.type === "BACKGROUND_BLUR";
}
