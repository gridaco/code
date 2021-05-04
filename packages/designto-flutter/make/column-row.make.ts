import { ReflectFrameNode } from "@design-sdk/core/nodes";
import * as flutter from "@bridged.xyz/flutter-builder";
import { Axis as ReflectAxis } from "@reflect-ui/core/lib";
import { interpretCrossAxisAlignment } from "../interpreter/cross-axis-alignment.interpret";
import { interpretMainAxisAlignment } from "../interpreter/main-axis-alignment.interpreter";
import { interpretMainAxisSize } from "../interpreter/main-axis-size.interpret";
import { makeSafelyAsList } from "../utils/make-as-safe-list";

export type RowOrColumn = "Row" | "Column";
export function makeRowColumn(
  node: ReflectFrameNode,
  children: Array<flutter.Widget>
): flutter.Widget {
  // ROW or COLUMN
  const rowOrColumn: RowOrColumn =
    node.layoutMode === ReflectAxis.horizontal ? "Row" : "Column";

  const _mainAxisAlignment = interpretMainAxisAlignment(node.mainAxisAlignment);
  const _mainAxisSize: flutter.MainAxisSize = interpretMainAxisSize(node);
  const _crossAxisAlignment = interpretCrossAxisAlignment(
    node.crossAxisAlignment
  );

  // safely make childeren as list type
  children = makeSafelyAsList<flutter.Widget>(children);

  switch (rowOrColumn) {
    case "Row":
      return new flutter.Row({
        children: children,
        mainAxisSize: _mainAxisSize,
        mainAxisAlignment: _mainAxisAlignment,
        crossAxisAlignment: _crossAxisAlignment,
      });
    case "Column":
      return new flutter.Column({
        children: children,
        mainAxisSize: _mainAxisSize,
        mainAxisAlignment: _mainAxisAlignment,
        crossAxisAlignment: _crossAxisAlignment,
      });
  }
}
