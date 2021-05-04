import { repo_assets, nodes } from "@design-sdk/core";

export function interpretIllust(
  node: nodes.ReflectSceneNode
): repo_assets.TemporaryImageAsset {
  const asset = repo_assets.MainImageRepository.instance.current.addImage({
    key: node.id,
    hash: undefined,
  });

  return asset;
}
