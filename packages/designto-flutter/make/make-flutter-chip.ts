import { retrievePrimaryColor } from "@design-sdk/core/utils";
import * as flutter from "@flutter-builder/flutter";
import { manifests } from "@reflect-ui/detection";
import { borderside } from "../painting/painting-border-side";
import { makeColor } from "./make-flutter-color";
import * as painting from "../painting";

export function makeChip(manifest: manifests.DetectedChipManifest) {
  var content = new flutter.Text(manifest.content?.text);
  const color: flutter.Color = makeColor(manifest.base.fills);
  const textColor: flutter.Color = makeColor(manifest.content?.fills);
  const height = manifest.base.height;
  const shape = new flutter.RoundedRectangleBorder({
    borderRadius: painting.borderRadius(manifest.base.cornerRadius),
    side: borderside({
      color: retrievePrimaryColor(manifest.base.strokes),
      width: manifest.base.strokeWeight,
    }),
  });
  const onSelected = flutter.Snippet.fromStatic(
    '(){ print("Chip onSelected"); }'
  ) as any;
  const onDeleted = flutter.Snippet.fromStatic(
    '(){ print("Chip onSelected"); }'
  ) as any;

  const deleteIcon = manifest.trailing;
  const avartar = manifest.leading;

  var leadingWidget;
  var trailingWidget;

  if (manifest.leading) {
    // TODO: Make
  }

  if (manifest.trailing) {
    // TODO: implement trailing
    // const icon = makeDynamicIcon(manifest.trailing);
    // trailingWidget = icon;
  }

  return new flutter.Chip({
    // onSelected : onSelected,
    onDeleted: onDeleted,
    label: content,
    labelStyle: new flutter.TextStyle({ color: textColor }),
    backgroundColor: color,
    shape,
    avartar: leadingWidget,
    deleteIcon: trailingWidget,
    // height
  });
}
