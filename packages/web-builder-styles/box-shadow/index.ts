import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { color } from "../color";
import { px } from "../dimensions";

export function boxshadow(bs: BoxShadowManifest): string {
  if (!bs) {
    return;
  }

  return `${px(bs.offset.dx)} ${px(bs.offset.dy)} ${px(bs.blurRadius)} ${color(
    bs.color
  )}`;
}
