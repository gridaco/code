import { Stack, Widget } from "@bridged.xyz/flutter-builder";
import { makeSafelyAsStackList } from "../utils/make-as-safe-list";

export function makeStack(children: Widget[]): Stack {
  return new Stack({
    children: makeSafelyAsStackList(children),
  });
}
