import { ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { repo_assets } from "@bridged.xyz/design-sdk";

export function interpretIllust(
  node: ReflectSceneNode
): repo_assets.TemporaryImageAsset {
  const asset = repo_assets.ImageRepositories.current.addImage({
    key: node.id,
    hash: undefined,
  });

  return asset;
}
