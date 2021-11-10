import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { color } from "../color";
import { px } from "../dimensions";

export function boxshadow(bs: BoxShadowManifest[]): string {
  if (!bs || bs.length === 0) {
    return;
  }
  const res = bs.map((shadow) => {
    const _spreadRadius = px(shadow.spreadRadius) ?? "";

    return `${px(shadow.offset.dx)} ${px(shadow.offset.dy)} ${px(
      shadow.blurRadius
    )} ${_spreadRadius} ${color(shadow.color)}`;
  });

  return res.toString();
}
