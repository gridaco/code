import { ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { Icons } from "@bridged.xyz/flutter-builder/lib";
import { IconData } from "@bridged.xyz/flutter-builder/lib/widgets/icon-data";
import { repo_assets } from "@bridged.xyz/design-sdk";

export function interpretIcon(
  node: ReflectSceneNode
): IconData | repo_assets.TemporaryImageAsset {
  try {
    // regex is valid, but does not work at this point. inspect this, make it live again.
    // const re = /(?<=mdi_)(.*?)*/g // finds **mdi_** pattern
    const splits = node.name.split("mdi_");
    const name = splits[splits.length - 1];
    console.log(`mdi matching name found, ${JSON.stringify(name)}`);
    const mdicon = Icons.fromName(name);
    return mdicon;
  } catch (e) {
    console.info(
      `no flutter native icon with ${node.name} found, making image instead.`
    );
  }

  const asset = repo_assets.ImageRepositories.current.addImage({
    key: node.id,
    hash: null,
  });
  return asset;
}
