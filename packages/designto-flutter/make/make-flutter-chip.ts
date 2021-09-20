import * as flutter from "@bridged.xyz/flutter-builder";
import { manifests } from "@reflect-ui/detection";
import { makeBorderRadius } from ".";
import { makeBorderSide } from "./make-flutter-border-side";
import { makeColor } from "./make-flutter-color";

export function makeChip(manifest: manifests.DetectedChipManifest) {
  console.log({ manifest });
  var content = new flutter.Text(manifest.content?.characters);
  const color: flutter.Color = makeColor(manifest.base.fills);
  const textColor: flutter.Color = makeColor(manifest.content?.fills);
  const height = manifest.base.height;
  const shape = new flutter.RoundedRectangleBorder({
    borderRadius: makeBorderRadius(manifest.base),
    side: makeBorderSide(manifest.base),
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
