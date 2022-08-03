import * as flutter from "@flutter-builder/flutter";

export function handle_flutter_case_nested_positioned_stack(
  stack: flutter.Stack
): flutter.Container {
  return new flutter.Container({
    // TODO: do we need this?
    width: flutter.MediaQuery.of().size.width,
    height: flutter.MediaQuery.of().size.height,
    child: stack,
  });
}
