import { TextTransform } from "@reflect-ui/core";

export function textTransform(tt: TextTransform) {
  switch (tt) {
    case TextTransform.capitalize:
      return "capitalize";
    case TextTransform.lowercase:
      return "lowercase";
    case TextTransform.uppercase:
      return "uppercase";
    case TextTransform.fullwidth:
      return "full-width";
    case TextTransform.fullsizekana:
      return "full-size-kana";
    case TextTransform.none:
    default:
      // for none, we don't explicitly set it - to make it shorter.
      return;
  }
}
