import * as flutter from "@bridged.xyz/flutter-builder";

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
