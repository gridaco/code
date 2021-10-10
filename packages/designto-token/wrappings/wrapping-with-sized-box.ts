import { Widget, SizedBox } from "@reflect-ui/core";

export function withSizedBox(
  t: Widget,
  size: { width: number; height: number }
) {
  return new SizedBox({
    key: t.key,
    ...size,
    child: t,
  });
}
