import * as flutter from "@flutter-builder/flutter";

export const onPressed = flutter.Snippet.fromStatic(
  '(){ print("Button clicked!"); }'
) as any;
