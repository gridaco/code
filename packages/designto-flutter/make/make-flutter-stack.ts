import * as flutter from "@bridged.xyz/flutter-builder";
import { makeSafelyAsStackList } from "../utils/make-as-safe-list";

export function makeStack(children: flutter.Widget[]): flutter.Stack {
  return new flutter.Stack({
    children: makeSafelyAsStackList(children),
  });
}
