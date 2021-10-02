import { TextDecoration } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function textDecoration(
  textDecoration: TextDecoration
): flutter.TextDecoration {
  if (!textDecoration) {
    return;
  }
  let decoration: flutter.TextDecoration;
  if (textDecoration === TextDecoration.underline) {
    decoration = flutter.TextDecoration.underline as flutter.Snippet;
  }
  return decoration;
}
