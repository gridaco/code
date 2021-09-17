import { CrossAxisAlignment } from "@reflect-ui/core";

export function alignself(align: CrossAxisAlignment): string {
  if (!align) {
    return;
  }

  switch (align) {
    case CrossAxisAlignment.baseline:
      return "baseline";
    case CrossAxisAlignment.center:
      return "center";
    case CrossAxisAlignment.end:
      return "end";
    case CrossAxisAlignment.start:
      return "start";
    case CrossAxisAlignment.stretch:
      return "stretch";
  }

  throw `input "${align}" is cannot be converted to valid css value.`;
}
