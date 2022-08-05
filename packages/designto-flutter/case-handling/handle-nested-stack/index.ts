import type { SnapshotWidget } from "@designto/token";
import * as flutter from "@flutter-builder/flutter";
import * as core from "@reflect-ui/core";

export function handle_flutter_case_nested_positioned_stack(
  stack: flutter.Stack,
  context: {
    widget: SnapshotWidget<core.Stack>;
    explicit_width?: boolean;
    explicit_height?: boolean;
  }
): flutter.Container {
  const { explicit_width, explicit_height } = context;
  const { snapshot: original } = context.widget;

  return new flutter.Container({
    key: new flutter.Key(
      "container for nested stack of " + context.widget.key.id
    ),
    width: explicit_width ? original.width : undefined,
    height: explicit_height ? original.height : undefined,
    child: stack,
  });
}
