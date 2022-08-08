import * as flutter from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";
import * as painting from "../painting";
import * as dartui from "../dart-ui";

export function compose_flutter_unwrapped_text_field(
  key: flutter.Key,
  widget: core.TextField,
  container?: core.Container
): flutter.TextField {
  const { decoration } = widget;
  return new flutter.TextField({
    key: key,
    style: painting.textStyle(widget.style),
    obscureText: widget.obscureText,
    obscuringCharacter: widget.obscuringCharacter,
    decoration: new flutter.InputDecoration({
      fillColor: dartui.color(decoration?.fillColor),
      // border: decoration?.border,
    }),
  });
}
