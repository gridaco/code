import { nodes } from "@design-sdk/core";
import * as flutter from "@bridged.xyz/flutter-builder";
import { makeColor } from ".";
import { interpretIcon } from "../interpreter/icon.interpreter";

export function makeDynamicIcon(
  node: nodes.ReflectSceneNode
): flutter.Icon | flutter.Image {
  const iconContent = interpretIcon(node);
  if (iconContent instanceof flutter.IconData) {
    return makeIcon(node, iconContent);
  } else {
    return flutter.Image.network(iconContent.url, {
      width: node.width,
      height: node.height,
      fit: flutter.BoxFit.cover as flutter.Snippet,
    })
      .addComment("Detected as Icon")
      .addComment(
        `FIXME: Check your design. this is an icon of node ${node.toString()}. we couldn't any matching flutter native icon, so we uploaded the asset to the cloud, load from it.`
      );
  }
}

export function makeIcon(node: nodes.ReflectSceneNode, icon: flutter.IconData) {
  let fills = node.primaryFill;

  return new flutter.Icon(icon, {
    size: node.width,
    color: makeColor(fills),
  });
}

export function makePlaceholderIcon(
  node: nodes.ReflectSceneNode
): flutter.Icon {
  return makeIcon(node, flutter.Snippet.fromStatic("Icons.add"));
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
