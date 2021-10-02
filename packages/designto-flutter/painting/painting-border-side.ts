import * as flutter from "@flutter-builder/flutter";
import type { Color } from "@reflect-ui/core";
import { roundNumber } from "@reflect-ui/uiutils";
import * as dartui from "../dart-ui";

export function borderside({ color, width }: { color: Color; width: number }) {
  return new flutter.BorderSide({
    color: dartui.color(color),
    width: roundNumber(width),
  });
}
