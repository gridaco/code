import { ReflectSceneNode } from "@design-sdk/core";
import * as flutter from "@flutter-builder/flutter";
import {
  findRemotePreservedDefaultNamedOssIcon,
  interpretFlutterImageIcon,
  interpretFlutterMaterialIconData,
} from "../interpreter/icon.interpreter";
import { Color, IconManifest, MdiConfig } from "@reflect-ui/core";
import * as dartui from "../dart-ui";
import { DetectedIconData } from "@reflect-ui/detection/lib/icon.detection";
import { roundDouble } from "../_utils";

type FlutterDynamicIconLike = flutter.Icon | flutter.Image;
export function makeDetectedIcon(d: DetectedIconData): FlutterDynamicIconLike {
  switch (d.type) {
    case "named":
      if (d.icon.host === "material") {
        const icondata = interpretFlutterMaterialIconData(
          d as IconManifest<MdiConfig>
        );
        return makeIcon({
          size: d.size,
          icon: icondata,
          color: d.color,
        });
      } else {
        const remote_named_icon_src = findRemotePreservedDefaultNamedOssIcon(
          d.icon
        );
        return makeIconAsImage({
          ...d,
          icon: remote_named_icon_src,
        });
        // other than mdi is not handled.
      }
      break;
    case "design-node":
      return makeDesignNodeIconAsImage(d);
  }
}

function makeDesignNodeIconAsImage(
  d: IconManifest<ReflectSceneNode>
): flutter.Image {
  const iconContent = interpretFlutterImageIcon(d.icon);
  return flutter.Image.network(iconContent.url, {
    width: roundDouble(d.size),
    height: roundDouble(d.size),
    fit: flutter.BoxFit.cover as flutter.Snippet,
  })
    .addComment("Detected as Icon")
    .addComment(
      `TODO: Check your design. this is an icon of node ${d.icon.toString()}. we couldn't any matching flutter native icon, so we uploaded the asset to the cloud, load from it.`
    );
}

function makeIconAsImage(d: IconManifest<string>) {
  return flutter.Image.network(d.icon, {
    width: roundDouble(d.size),
    height: roundDouble(d.size),
    fit: flutter.BoxFit.cover as flutter.Snippet,
  });
}

export function makeIcon({
  icon,
  size,
  color,
}: {
  icon: flutter.IconData;
  size: number;
  color: Color;
}) {
  return new flutter.Icon(icon, {
    size: roundDouble(size),
    color: dartui.color(color),
  });
}

/**
 * builds icon widget if value is hold by flutter built-in material icons
 * @param iconName
 */
export function makeMaterialIcon(iconName: string): flutter.Icon {
  try {
    return new flutter.Icon(flutter.Icons.fromName(iconName));
  } catch (e) {
    // return default icon
    return new flutter.Icon(flutter.Snippet.fromStatic("Icons.add"));
  }
}
