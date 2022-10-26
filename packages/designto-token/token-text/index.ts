import type { ReflectTextNode } from "@design-sdk/figma-node";
import { RenderedText, TextStyle, TextShadowManifest } from "@reflect-ui/core";
import { SizedText } from "../tokens";
import { keyFromNode } from "../key";

/**
 * creates ReflectTextWidget from ReflectTextNode. can be RichText or Simple Text
 * @param node
 * @returns
 */
export function fromText(node: ReflectTextNode): RenderedText | SizedText {
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

  const key = keyFromNode(node);
  const text = new RenderedText({
    key: key,
    data: node.data,
    textAlign: node.textAlign,
    style: new TextStyle({
      decoration: node.textDecoration,
      fontFamily: node.fontName?.family,
      fontSize: node.fontSize,
      fontWeight: node.textStyle.fontWeight,
      color: node.primaryColor,
      lineHeight: node.lineHeight,
      letterSpacing: node.letterSpacing,
      textTransform: node.textCase,
      textShadow: node.shadows as TextShadowManifest[],
    }),
  });

  if (wh.height || wh.width) {
    return new SizedText({
      key: key.copyWith({ id: key.id + ".sized-text" }),
      child: text,
      width: wh.width,
      height: wh.height,
    });
  }

  return text;
}

export const tokenizeText = {
  fromText: fromText,
};
