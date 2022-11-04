import * as flutter from "@flutter-builder/flutter";
import { makeSafelyAsList } from "../../_utils";

/**
 * https://github.com/flutter/flutter/issues/49631#issuecomment-582090992
 * @param maybeWidgets
 * @returns
 */
export function handle_flutter_case_no_size_stack_children(
  maybeWidgets: Array<flutter.Widget> | flutter.Widget
): Array<flutter.Widget> {
  const list = makeSafelyAsList<flutter.Widget>(maybeWidgets);
  list.push(
    new flutter.Container({}).addComment(
      "stack requires empty non positioned widget to work properly. refer: https://github.com/flutter/flutter/issues/49631#issuecomment-582090992"
    )
  );
  return list;
}
