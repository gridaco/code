///
///
/// Note: there is a fundamental design flaw in the tokenizer,
/// the l, t, b, r property should not return "calc" - but this case,
/// for now, can be interpreted as center alignment,
/// and we are going to ignore the value inside the calc operation,
/// override the logic & values specifically for flutter
/// with Container + margin + alignment strategy of positioning & aligning biased items under Stack.
///

import * as core from "@reflect-ui/core";
import * as flutter from "@flutter-builder/flutter";
import type { Composer } from "../../tokens-to-flutter-widget";
import { SnapshotWidget } from "@designto/token";
import { unwrappedChild } from "@designto/token/wrappings";
import { rd } from "../../_utils";

export function handle_flutter_biased_center_positioning(
  positioned: core.Positioned,
  child_composer: Composer,
  {
    compose_positioned,
  }: {
    compose_positioned: Composer<flutter.Positioned>;
  }
): flutter.Container | flutter.Positioned {
  //
  const { left, right, top, bottom } = positioned;
  const l = _is_length_static;

  // if all values are static, use flutter.Positioned
  if (l(left) && l(right) && l(top) && l(bottom)) {
    return compose_positioned(positioned, child_composer);
  } else {
    const { name, x, y, constraints } = (
      unwrappedChild(positioned) as SnapshotWidget<core.Widget>
    ).snapshot;

    return new flutter.Positioned({
      left: rd(x),
      top: rd(y),
      child: child_composer(positioned.child, child_composer),
    });

    if (constraints.horizontal == "CENTER") {
    }

    if (constraints.vertical == "CENTER") {
    }

    // otherwise, we have to handle the calc or biased (center alignments)
    //
  }
}

function _is_length_static(l: core.DimensionLength): boolean {
  switch (typeof l) {
    case "number":
    case "undefined":
      return true;
    default:
      return false;
  }
}
