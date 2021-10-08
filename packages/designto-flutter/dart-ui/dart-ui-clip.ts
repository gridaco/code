import { Clip } from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
export function clip(clip: Clip): flutter.Clip {
  switch (clip) {
    case Clip.none:
      return flutter.Clip.none;
    case Clip.hardEdge:
      return flutter.Clip.hardEdge;
    case Clip.antiAlias:
      return flutter.Clip.antiAlias;
    case Clip.antiAliasWithSaveLayer:
      return flutter.Clip.antiAliasWithSaveLayer;
    default:
      throw new Error(`Unknown clip: ${clip}`);
  }
}
