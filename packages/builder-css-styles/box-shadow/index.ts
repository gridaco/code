import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { color } from "../color";
import { px } from "../dimensions";

export function boxshadow(bs: BoxShadowManifest[]): string {
  if (!bs || bs.length === 0) {
    return;
  }
  const res = bs.map((shadow) => {
    return `${px(shadow.offset.dx)} ${px(shadow.offset.dy)} ${px(
      shadow.blurRadius
    )} ${px(shadow.spreadRadius)} ${color(shadow.color)}`;
  });

  return res.toString();
}
