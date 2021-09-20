import { manifests } from "@reflect-ui/detection";
import * as flutter from "@bridged.xyz/flutter-builder";
import { makeColor } from "./make-flutter-color";
import { makeBorderRadius } from "./make-flutter-border-radius";
import { makeBorderSide } from "./make-flutter-border-side";
import { makeDetectedIcon } from "./make-flutter-icon";
import { onPressed } from "../static-snippets";
export function makeButton(manifest: manifests.DetectedButtonManifest) {
  const text = new flutter.Text(manifest.text?.characters);
  const color: flutter.Color = makeColor(manifest.base.fills);
  const textColor: flutter.Color = makeColor(manifest.text?.fills);
  const minWidth = manifest.base.width;
  const height = manifest.base.height;
  const shape = new flutter.RoundedRectangleBorder({
    borderRadius: makeBorderRadius(manifest.base),
    side: makeBorderSide(manifest.base),
  });

  if (manifest.icon) {
    const icon = makeDetectedIcon(manifest.icon);
    return flutter.FlatButton.icon({
      onPressed: onPressed,
      label: text,
      icon: icon,
      color: color,
      textColor: textColor,
      minWidth: minWidth,
      height: height,
      shape: shape,
    });
  }

  return new flutter.FlatButton({
    onPressed: onPressed,
    child: text,
    color: color,
    textColor: textColor,
    minWidth: minWidth,
    height: height,
    shape: shape,
  });
}
