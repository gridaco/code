import * as flutter from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";
import * as dartui from "../dart-ui";
import * as painting from "../painting";
import { onPressed } from "../static-snippets";
import { Composer } from ".";

type FlutterButton =
  | flutter.TextButton
  | flutter.ElevatedButton
  | flutter.OutlinedButton;

export function compose_flutter_unwrapped_button(
  key: flutter.Key,
  widget: core.ButtonStyleButton,
  child_composer: Composer,
  container?: core.Container
): FlutterButton {
  return new flutter.ElevatedButton({
    key: key,
    onPressed: onPressed,
    child: child_composer(widget.child, child_composer),
    style: flutter.ElevatedButton.styleFrom({
      // alignment: widget.style.alignment,
      padding:
        widget.style.padding &&
        painting.edgeinsets(widget.style.padding.default),
      minimumSize:
        widget.style.minimumSize &&
        new flutter.Size(
          widget.style.minimumSize.default.width,
          widget.style.minimumSize.default.height
        ),
      // shape: widget.style.shape,
      primary: dartui.color(widget.style.backgroundColor.default),
      textStyle: painting.textStyle(widget.style.textStyle.default),
    }),
  });
}
