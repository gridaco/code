import { ReflectSceneNode, ReflectVectorNode } from "@design-sdk/figma-node";
import { MainImageRepository } from "@design-sdk/asset-repository";
import { ImagePaint } from "@design-sdk/figma-types";
import { ImageWidget, VectorWidget } from "@reflect-ui/core";
import { keyFromNode } from "../key";
import { tokenizeBackground } from "../token-background";
import { tokenizeBitmap } from "./bitmap";

function fromStar(): VectorWidget {
  // return new VectorWidget("");
  return;
}

function fromLine() {
  // return new VectorWidget("");
}

function fromPoligon(): VectorWidget {
  return;
  // return new VectorWidget("");
}

function fromVector(vector: ReflectVectorNode) {
  // TODO: support vector.fillGeomatery.

  if (!vector?.vectorPaths || vector.vectorPaths.length === 0) {
    // we are not sure when specifically this happens, but as reported, curvy lines does not contain a vector paths.
    // so we just return a image bake of it.
    // console.info(`tried to get path data from vector, but none was provided. baking as a bitmap instead.`, vector);

    return tokenizeBitmap.fromAnyNode(vector);
  }
  const _key = keyFromNode(vector);
  return new VectorWidget({
    key: _key,
    ...vector,
    data: vector?.vectorPaths[0].data,
    fill: tokenizeBackground.fromFills(vector.fills),
  });
}

function fromFrame() {
  // return new VectorWidget("");
}

function fromImage(image: ReflectSceneNode, data: ImagePaint) {
  const _tmp_img = MainImageRepository.instance
    .get("fill-later-assets")
    .addImage({
      key: image.id,
      hash: data.imageHash,
    });

  const _key = keyFromNode(image);
  return new ImageWidget({
    key: _key,
    src: _tmp_img.url,
    width: image.width,
    height: image.height,
  });
}

export const tokenizeVector = {
  fromStar: fromStar,
  fromLine: fromLine,
  fromPoligon: fromPoligon,
  // fromFrame: fromFrame,
  fromImage: fromImage,
  fromVector: fromVector,
};
