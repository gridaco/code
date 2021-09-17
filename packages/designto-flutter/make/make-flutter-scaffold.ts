import * as flutter from "@bridged.xyz/flutter-builder";

export function makeScreen(
  child: flutter.Widget,
  scrollable?: boolean
): flutter.Scaffold {
  let wrapped: flutter.Widget;
  if (scrollable) {
    wrapped = new flutter.SingleChildScrollView({
      child: child,
    });
  } else {
    wrapped = child;
  }

  return new flutter.Scaffold({
    body: wrapped,
  });
}
