import { manifests } from "@reflect-ui/detection";
import * as flutter from "@bridged.xyz/flutter-builder";
import { makeColor } from "./color.make";
import { makeBorderRadius } from "./border-radius.make";
import { makeBorderSide } from "./border-side.make";
import { makeDynamicIcon, makeIcon } from "./icon.make";

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
  const onPressed = flutter.Snippet.fromStatic(
    '(){ print("Button clicked!"); }'
  ) as any;

  if (manifest.icon) {
    const icon = makeDynamicIcon(manifest.icon);
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
