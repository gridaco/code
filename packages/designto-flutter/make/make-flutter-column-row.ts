import { ReflectFrameNode } from "@design-sdk/figma-node";
import * as flutter from "@flutter-builder/flutter";
import { Axis as ReflectAxis } from "@reflect-ui/core";
import * as dartui from "../dart-ui";
import * as rendering from "../rendering";
import { makeSafelyAsList } from "../utils";

export type RowOrColumn = "Row" | "Column";
export function makeRowColumn(
  node: ReflectFrameNode,
  children: Array<flutter.Widget>
): flutter.Widget {
  // ROW or COLUMN
  const rowOrColumn: RowOrColumn =
    node.layoutMode === ReflectAxis.horizontal ? "Row" : "Column";

  const _mainAxisAlignment = rendering.mainAxisAlignment(
    node.mainAxisAlignment
  );
  const _mainAxisSize: flutter.MainAxisSize = rendering.mainAxisSize(
    // FIXME:
    // @ts-ignore
    node.layoutGrow
  );
  const _crossAxisAlignment = rendering.crossAxisAlignment(
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
