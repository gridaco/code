import { TextShadowManifest } from "@reflect-ui/core";
import { color } from "../color";
import { px } from "../dimensions";

export function textShadow(ts: TextShadowManifest[]): string {
  if (!ts) {
    return;
  }

  const res = ts.map((shadow) => {
    return `${px(shadow.offset.dx)} ${px(shadow.offset.dy)} ${px(
      shadow.blurRadius
    )} ${color(shadow.color)}`;
  });

  return res.toString();
}
