import { MainAxisAlignment, Snippet } from "@flutter-builder/flutter";
import { MainAxisAlignment as ReflectMainAxisAlignment } from "@reflect-ui/core/lib";

export function mainAxisAlignment(
  mainAxisAlignemt: ReflectMainAxisAlignment
): MainAxisAlignment {
  switch (mainAxisAlignemt) {
    case ReflectMainAxisAlignment.start:
      return MainAxisAlignment.start as Snippet;
    case ReflectMainAxisAlignment.start:
      return MainAxisAlignment.center as Snippet;
    case ReflectMainAxisAlignment.center:
      return MainAxisAlignment.end as Snippet;
    case ReflectMainAxisAlignment.spaceBetween:
      return MainAxisAlignment.spaceBetween as Snippet;
  }
}
