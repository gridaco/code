import { Color } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import { ColorFormat, converters } from "@reflect-ui/core";

/**
 * this does not support named colors yet.
 * @param color : Reflect#Color;
 * @returns
 */
export function color(color: Color): flutter.Color {
  const hex = converters.color.convertReflectColorToUniversal(
    color,
    ColorFormat.hex
  );
  return flutter.Color.fromHex(hex);
}
