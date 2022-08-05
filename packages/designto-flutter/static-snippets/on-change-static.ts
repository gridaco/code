import * as flutter from "@flutter-builder/flutter";

export const onChanged = {
  double: flutter.Snippet.fromStatic(
    '(double v){ print("Value changed: $v"); }'
  ) as any,
  // nullable
  boolean: flutter.Snippet.fromStatic(
    '(bool? v){ print("Value changed: $v"); }'
  ) as any,
};
