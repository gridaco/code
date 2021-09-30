import * as flutter from "@flutter-builder/flutter";

export function makeSafelyAsList<T>(maybeList: Array<T> | T): Array<T> {
  if (Array.isArray(maybeList)) {
    return maybeList;
  } else {
    return [maybeList];
  }
}

// https://github.com/flutter/flutter/issues/49631#issuecomment-582090992
export function makeSafelyAsStackList(
  maybeWidgets: Array<flutter.Widget> | flutter.Widget
): Array<flutter.Widget> {
  const list = makeSafelyAsList<flutter.Widget>(maybeWidgets);
  list.push(
    new flutter.Container().addComment(
      "stack requires empty non positioned widget to work properly. refer: https://github.com/flutter/flutter/issues/49631#issuecomment-582090992"
    )
  );
  return list;
}
