import { HeadingFlag } from "@code-features/flags";
import { ReflectSceneNode } from "@design-sdk/figma-node";
import type { Text } from "@reflect-ui/core";
import { tokenizeText } from "../../token-text";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export function tokenize_flagged_heading(
  node: ReflectSceneNode,
  flag: HeadingFlag
): Text | undefined {
  if (flag.value === false) return;
  if (node.type !== "TEXT") return;

  const level = get_level(flag);
  if (level === undefined) return; // this won't be happening

  const text = tokenizeText.fromText(node);
  text.element_preference_experimental = `h${level}`;
  return text;
}

function get_level(flag: HeadingFlag): HeadingLevel {
  switch (flag.flag) {
    case "h1":
    case "as-h1":
    case "as-heading1":
    case "heading1":
    case "as-headline1":
    case "headline1":
      return 1;

    case "h2":
    case "as-h2":
    case "as-heading2":
    case "heading2":
    case "as-headline2":
    case "headline2":
      return 2;

    case "h3":
    case "as-h3":
    case "as-heading3":
    case "heading3":
    case "as-headline3":
    case "headline3":
      return 3;

    case "h4":
    case "as-h4":
    case "as-heading4":
    case "heading4":
    case "as-headline4":
    case "headline4":
      return 4;

    case "h5":
    case "as-h5":
    case "as-heading5":
    case "heading5":
    case "as-headline5":
    case "headline5":
      return 5;

    case "h6":
    case "as-h6":
    case "as-heading6":
    case "heading6":
    case "as-headline6":
    case "headline6":
      return 6;
  }

  console.trace("level parsing from heading flag failed.");
}
