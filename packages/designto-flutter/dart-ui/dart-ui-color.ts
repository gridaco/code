import { Color } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import { ColorFormat, converters } from "@reflect-ui/core";

/**
 * this does not yet fully support named colors (only black, white for now).
 * @param color : Reflect#Color;
 * @returns
 */
export function color(color: Color | undefined): flutter.Color | undefined {
  if (!color) {
    return color as undefined | null;
  }
  const hex = converters.color.convertReflectColorToUniversal(
    color,
    ColorFormat.hex
  );

  // named colors
  // add more named colors here
  if (hex === "#ff000000") {
    return flutter.Colors.black;
  }
  if (hex === "#ffffffff") {
    return flutter.Colors.white;
  }

  return flutter.Color.fromHex(hex);
}
