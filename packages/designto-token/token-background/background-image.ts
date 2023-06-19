import { Figma } from "@design-sdk/figma-types";
import { MainImageRepository } from "@design-sdk/asset-repository";
import { BoxFit, ImageRepeat } from "@reflect-ui/core";
import type { BackgroundImageManifest } from "../tokens/background-image";

/**
 * @deprecated TODO: update the asset repository pattern.
 */
const _asset_key = "fill-later-assets";

export function tokenize_background_image(
  paint: Figma.ImagePaint
): BackgroundImageManifest {
  const { scaleMode, imageHash } = paint;
  const _tmp_img = MainImageRepository.instance.get(_asset_key).addImage({
    key: imageHash,
    hash: imageHash,
  });

  // TODO:
  return {
    src: _tmp_img.url,
    fit: from_image_paint_scale_mode_to_box_fit(scaleMode),
    repeat: scaleMode === "TILE" ? ImageRepeat.repeat : ImageRepeat.noRepeat,
  };
}

function from_image_paint_scale_mode_to_box_fit(
  scalemode: Figma.ImagePaint["scaleMode"]
): BoxFit {
  // TODO: the types are not universally compatible.
  switch (scalemode) {
    case "FILL":
      return BoxFit.cover;
    case "FIT":
      return BoxFit.fitHeight;
    case "CROP":
      return BoxFit.cover;
    case "TILE":
      return BoxFit.none;
    default:
      return BoxFit.cover;
  }
}

/**
 * handle background source with stacking
 */
export function withStacking() {
  //
}

function background_image_as_image_widget() {}

function background_video_as_video_widget() {}
