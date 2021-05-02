import { Figma } from "@bridged.xyz/design-sdk";
import { retrieveFill } from "@bridged.xyz/design-sdk/lib/utils";
import * as flutter from "@bridged.xyz/flutter-builder";
import { converters } from "@reflect-ui/core/lib";

/**
 * Retrieve the SOLID color for Flutter when existent, otherwise ""
 */
export function makeColor(
  fills: ReadonlyArray<Figma.Paint> | Figma.Paint
): flutter.Color | undefined {
  const fill = retrieveFill(fills);

  if (fill?.type === "SOLID") {
    // todo maybe ignore text color when it is black?
    const opacity = fill.opacity ?? 1.0;
    return makeColorFromRGBO(fill.color, opacity);
  }

  return undefined;
}

export function makeColorFromRGBO(
  color: Figma.RGB,
  opacity: number
): flutter.Color {
  try {
    if (color.r + color.g + color.b === 0 && opacity === 0) {
      return flutter.Colors.transparent;
    }
    if (color.r + color.g + color.b === 0 && opacity === 1) {
      return flutter.Colors.black;
    }
    if (color.r + color.g + color.b === 3 && opacity === 1) {
      return flutter.Colors.white;
    }

    return flutter.Color.fromHex(converters.color.rgbTo8hex(color, opacity));
  } catch (e) {
    console.error(
      `error while converting color to rgba color:${color}, opacity:${opacity}`,
      e
    );
    return;
  }
}
