import { OverflowBox, Widget } from "@reflect-ui/core";

export function withOverflowBox(t: Widget): Widget {
  return new OverflowBox({
    key: t.key,
    child: t,
  });
}
