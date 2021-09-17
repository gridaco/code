import { ReflectFrameNode } from "@design-sdk/core";
import * as flutter from "@bridged.xyz/flutter-builder";
import { Axis as ReflectAxis } from "@reflect-ui/core/lib";
import {
  mapCrossAxisAlignment,
  mapMainAxisAlignment,
} from "../core-type-mappers";
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

  const _mainAxisAlignment = mapMainAxisAlignment(node.mainAxisAlignment);
  const _mainAxisSize: flutter.MainAxisSize = interpretMainAxisSize(
    node.layoutGrow
  );
  const _crossAxisAlignment = mapCrossAxisAlignment(node.crossAxisAlignment);

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
