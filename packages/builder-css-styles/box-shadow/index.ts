import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { color } from "../color";
import { px } from "../dimensions";

export function boxShadow(bs: BoxShadowManifest[]): string {
  if (bs.length === 0 || !bs) {
    return;
  }
  const res = bs.map((shadow) => {
    return `${px(shadow.offset.dx)} ${px(shadow.offset.dy)} ${px(
      shadow.blurRadius
    )} ${color(shadow.color)}`;
  });

  return res.toString();
}
