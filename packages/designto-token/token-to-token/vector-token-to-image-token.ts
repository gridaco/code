import { MainImageRepository } from "@design-sdk/asset-repository";
import { ImageWidget, VectorWidget } from "@reflect-ui/core";

/**
 * convert vector widget to image widget, ignoring that widget is already tokenized to vector widget
 *
 * this is dangerous since the vector token is already tokenized, we cannot ensure if the vector token's key will maintain its identity.
 * @param vector
 * @returns
 */
export function vector_token_to_image_token(vector: VectorWidget): ImageWidget {
  const _tmp_img = MainImageRepository.instance
    .get("fill-later-assets")
    .addImage({
      key: vector.key.id,
    });

  return new ImageWidget({
    key: vector.key,
    src: _tmp_img.url,
    width: vector.width,
    height: vector.height,
  });
}
