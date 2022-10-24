import * as core from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import type { Composer } from ".";
import { rd } from "../_utils";

export function compose_flutter_positioned(
  positioned: core.Positioned,
  child_composer: Composer
): flutter.Positioned {
  return new flutter.Positioned({
    left: positioned.left && _tmp_length_convert(positioned.left),
    right: positioned.right && _tmp_length_convert(positioned.right),
    top: positioned.top && _tmp_length_convert(positioned.top),
    bottom: positioned.bottom && _tmp_length_convert(positioned.bottom),
    child: child_composer(positioned.child, child_composer),
  });
}

const _tmp_length_convert = (l) => {
  return rd(l) as number;
};
