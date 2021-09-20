import * as flutter from "@bridged.xyz/flutter-builder";

export const onPressed = flutter.Snippet.fromStatic(
  '(){ print("Button clicked!"); }'
) as any;
