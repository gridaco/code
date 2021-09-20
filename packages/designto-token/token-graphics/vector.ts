import { ReflectSceneNode, ReflectVectorNode } from "@design-sdk/core";
import { MainImageRepository } from "@design-sdk/core/assets-repository";
import { ImagePaint } from "@design-sdk/figma-types";
import { ImageWidget, VectorWidget } from "@reflect-ui/core";
import { keyFromNode } from "../key";

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
  const _key = keyFromNode(vector);
  return new VectorWidget({
    key: _key,
    ...vector,
    data: vector?.vectorPaths[0]?.data,
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
