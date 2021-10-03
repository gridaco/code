import * as flutter from "@flutter-builder/flutter";
export function makeSafelyAsList<T>(maybeList: Array<T> | T): Array<T> {
  if (Array.isArray(maybeList)) {
    return maybeList;
  } else {
    return [maybeList];
  }
}

export function makeSaflyAsSingle(
  maybeWidget: Array<flutter.Widget> | flutter.Widget
): flutter.Widget {
  if (Array.isArray(maybeWidget)) {
    return new flutter.Container();
  } else {
    if (maybeWidget instanceof flutter.Widget) {
      return maybeWidget;
    }
  }
  return new flutter.Container();
}
