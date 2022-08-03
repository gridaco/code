import type { ReflectTextNode } from "@design-sdk/figma-node";
import { RenderedText, TextStyle, TextShadowManifest } from "@reflect-ui/core";
import { keyFromNode } from "../key";

/**
 * creates ReflectTextWidget from ReflectTextNode. can be RichText or Simple Text
 * @param node
 * @returns
 */
export function fromText(node: ReflectTextNode): RenderedText {
  // 1. check if text is rich text
  // if () //

  // -------------------------------
  // resizing
  const wh = {
    width: undefined,
    height: undefined,
  };
  switch (node.textAutoResize) {
    case "HEIGHT":
      // means only height is auto.
      // this should be ignored when the parent is a flex.
      // if fill container, then the size should not be specified.
      wh.width = node.width; // fix the width
      break;
    case "WIDTH_AND_HEIGHT":
      // do not specify wh
      break;
    case "NONE":
      // TODO: overflow: visible
      wh.width = node.width;
      wh.height = node.height;
      break;
  }
  // -------------------------------

  return new RenderedText({
    key: keyFromNode(node),
    data: node.data,
    textAlign: node.textAlign,
    style: new TextStyle({
      decoration: node.textDecoration,
      fontFamily: node.fontName?.family,
      fontSize: node.fontSize,
      fontWeight: node.fontWeight,
      color: node.primaryColor,
      lineHeight: node.lineHeight,
      letterSpacing: node.letterSpacing,
      textTransform: node.textCase,
      textShadow: node.shadows as TextShadowManifest[],
    }),
    ...wh,
  });
}

export const tokenizeText = {
  fromText: fromText,
};
