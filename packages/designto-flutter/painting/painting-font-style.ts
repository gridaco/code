import { FontStyle } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";

export function fontStyle(style: FontStyle): flutter.FontStyle {
  switch (style) {
    case FontStyle.italic:
      return flutter.FontStyle.italic as flutter.Snippet;
    case FontStyle.normal:
      return; // not returning any value, since normal is a default value.
  }
}
