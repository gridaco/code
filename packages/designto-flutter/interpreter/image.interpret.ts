import { ReflectDefaultShapeMixin } from "@design-sdk/core";
import { ImageProvider, NetworkImage } from "@bridged.xyz/flutter-builder";
import {
  retrieveImageFill,
  retrievePrimaryImageFill,
} from "@design-sdk/core/utils/retrieve-image-fills";
import { repo_assets } from "@design-sdk/core";
import { Figma } from "@design-sdk/figma";

/**
 * finds the primary image in shape node, upload it to temporary hosting. returns the ImageProvider with hosted image.
 * @param node basically, rect or ellipes node.
 */
export function interpretImageFilllNode(
  node: ReflectDefaultShapeMixin
): ImageProvider {
  if (node.hasImage) {
    return interpretImageFills(
      node.fills as ReadonlyArray<Figma.Paint>,
      node.id
    );
  }
}

export function interpretImageFills(
  fills: ReadonlyArray<Figma.Paint> | Figma.Paint,
  key: string
): ImageProvider {
  let image: Figma.Image;
  if (Array.isArray(fills)) {
    image = retrievePrimaryImageFill(fills);
  } else {
    // if fill is single, and the fill type was "IMAGE", we can consider it as a ImagePaint
    image = retrieveImageFill(fills as Figma.ImagePaint);
  }

  const hostedImage = repo_assets.MainImageRepository.instance
    .get("fill-later-assets")
    .addImage({
      key: key,
      hash: image?.hash,
    });

  // this will give image provider `Image.network("https://domain.com/image.png")`
  return new NetworkImage(hostedImage.url);
}

export function interpretImageFill(
  fill: Figma.ImagePaint,
  key: string
): ImageProvider {
  let image = retrieveImageFill(fill);
  const hostedImage = repo_assets.MainImageRepository.instance
    .get("fill-later-assets")
    .addImage({
      key: key,
      hash: image?.hash,
    });

  return new NetworkImage(hostedImage.url);
}
