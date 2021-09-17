import { ReflectSceneNode } from "@design-sdk/core";
import { Icons, IconData } from "@bridged.xyz/flutter-builder";
import { repo_assets } from "@design-sdk/core";

export function interpretIcon(
  node: ReflectSceneNode
): IconData | repo_assets.TemporaryImageAsset {
  try {
    return findFlutterMaterialIcon(node.name);
  } catch (e) {
    console.info(
      `no flutter native icon with ${node.name} found, making image instead.`
    );
  }

  const asset = repo_assets.MainImageRepository.instance.current.addImage({
    key: node.id,
    hash: null,
  });
  return asset;
}

/**
 * retrieves icon data with node's full name with mdi prefix.
 * Note that flutter does not contain full material design icons.
 * @param fullname
 * @returns
 */
function findFlutterMaterialIcon(fullname: string): IconData {
  // regex is valid, but does not work at this point. inspect this, make it live again.
  // const re = /(?<=mdi_)(.*?)*/g // finds **mdi_** pattern
  const splits = fullname.split("mdi_");
  const name = splits[splits.length - 1];
  console.log(`mdi matching name found, ${JSON.stringify(name)}`);
  const mdicon = Icons.fromName(name);
  return mdicon;
}
