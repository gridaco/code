import { ReflectDefaultShapeMixin } from "@bridged.xyz/design-sdk/lib/nodes";
import { ImageProvider, NetworkImage } from "@bridged.xyz/flutter-builder";
import {
  retrieveImageFill,
  retrievePrimaryImageFill,
} from "@bridged.xyz/design-sdk/lib/utils/retrieve-image-fills";
import { repo_assets } from "@bridged.xyz/design-sdk";
import { currentBuildingNodeId } from "..";
import { Figma } from "@bridged.xyz/design-sdk/lib/figma";

// TODO - make this non async. It's too costly. generate preview image url local algorythm, upload syncronously.

/**
 * finds the primary image in shape node, upload it to temporary hosting. returns the ImageProvider with hosted image.
 * @param node basically, rect or ellipes node.
 */
export function interpretImageFilllNode(
  node: ReflectDefaultShapeMixin
): ImageProvider {
  if (node.hasImage) {
    return interpretImageFills(node.fills as ReadonlyArray<Figma.Paint>);
  }
}

export function interpretImageFills(
  fills: ReadonlyArray<Figma.Paint> | Figma.Paint
): ImageProvider {
  let image: Figma.Image;
  if (Array.isArray(fills)) {
    image = retrievePrimaryImageFill(fills);
  } else {
    // if fill is single, and the fill type was "IMAGE", we can consider it as a ImagePaint
    image = retrieveImageFill(fills as Figma.ImagePaint);
  }

  const hostedImage = repo_assets.ImageRepositories.current.addImage({
    key: currentBuildingNodeId,
    hash: image?.hash,
  });

  // this will give image provider `Image.network("https://domain.com/image.png")`
  return new NetworkImage(hostedImage.url);
}
