import { ReflectSceneNode } from "@design-sdk/figma-node";
import {
  TemporaryImageAsset,
  MainImageRepository,
} from "@design-sdk/asset-repository";

export function interpretIllust(node: ReflectSceneNode): TemporaryImageAsset {
  const asset = MainImageRepository.instance.get("fill-later-assets").addImage({
    key: node.id,
    hash: undefined,
  });

  return asset;
}
