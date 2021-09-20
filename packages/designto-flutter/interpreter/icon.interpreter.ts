import { ReflectSceneNode } from "@design-sdk/core";
import { Icons, IconData } from "@bridged.xyz/flutter-builder";
import { repo_assets } from "@design-sdk/core";
import {
  IconManifest,
  MdiConfig,
  NamedDefaultOssIconConfig,
} from "@reflect-ui/core";

export function interpretFlutterMaterialIconData(
  d: IconManifest<MdiConfig>,
  fallback = true
) {
  try {
    return findFlutterMaterialIcon(d.icon.family);
  } catch (e) {
    if (fallback) {
      return Icons.add.addComment(
        `no flutter native icon with ${d.icon.family} found. (fallback to Icons.add)`
      );
    } else {
      throw `no flutter native icon with ${d.icon.family} found.`;
    }
  }
}

export function interpretFlutterImageIcon(
  node: ReflectSceneNode
): repo_assets.TemporaryImageAsset {
  const asset = repo_assets.MainImageRepository.instance
    .get("fill-later-assets")
    .addImage({
      key: node.id,
      hash: null,
    });
  return asset;
}

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

  return interpretFlutterImageIcon(node);
}

export function findRemotePreservedDefaultNamedOssIcon(
  d: NamedDefaultOssIconConfig
): string {
  // TODO: find the dedicated image icon
  return "https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png";
}

/**
 * Note that flutter does not contain full material design icons.
 *
 * **Throws** when no icon is found.
 * @param fullname
 * @returns
 */
function findFlutterMaterialIcon(mdi_name: string): IconData {
  try {
    const mdicon = Icons.fromName(mdi_name);
    return mdicon;
  } catch (_) {
    throw `no matching mdi found for flutter - "Icons.${mdi_name}"`;
  }
}
