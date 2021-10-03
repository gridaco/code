import { manifests } from "@reflect-ui/detection";
import * as flutter from "@flutter-builder/flutter";
import { makeColor } from "./make-flutter-color";
import { borderRadius } from "../painting/painting-border-radius";
import { borderside } from "../painting/painting-border-side";
import { makeDetectedIcon } from "./make-flutter-icon";
import { onPressed } from "../static-snippets";
import { retrievePrimaryColor } from "@design-sdk/core/utils";

export function makeFlatButton(manifest: manifests.DetectedButtonManifest) {
  const text = new flutter.Text(manifest.text?.text);
  const color: flutter.Color = makeColor(manifest.base.fills);
  const textColor: flutter.Color = makeColor(manifest.text?.fills);
  const minWidth = manifest.base.width;
  const height = manifest.base.height;
  const shape = new flutter.RoundedRectangleBorder({
    borderRadius: borderRadius(manifest.base.cornerRadius),
    side: borderside({
      color: retrievePrimaryColor(manifest.base.strokes),
      width: manifest.base.strokeWeight,
    }),
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
