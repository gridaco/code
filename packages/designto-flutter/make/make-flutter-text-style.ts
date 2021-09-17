import * as flutter from "@bridged.xyz/flutter-builder";
import * as core from "@reflect-ui/core";
import { nodes } from "@design-sdk/core";
import { makeColor } from ".";
import { TextStyleRepository } from "@design-sdk/figma";
import { roundDouble } from "../convert";

/**
 * get the code of Text#style (text-style) via the name of the defined textstyle.
 * I.E, "H1" will give you "Theme.of(context).textTheme.headline1"
 * @param textStyleName
 */
function getThemedTextStyleByName(textStyleName: string): flutter.TextStyle {
  const styleDef = TextStyleRepository.getStyleDefFromTextStyleName(
    textStyleName
  );
  return flutter.Theme.of().textTheme[styleDef] as flutter.TextStyle;
}

export function makeTextStyleFromDesign(
  style: core.ITextStyle
): flutter.TextStyle {
  let decoration: flutter.TextDecoration = makeTextDecoration(style.decoration);
  const fontFamily: string = style.fontFamily;
  const fontWeight: flutter.FontWeight = flutter.FontWeight[style.fontWeight];
  // percentage is not supported
  const letterSpacing = style.letterSpacing;
  const fontStyle = makeFontStyle(style.fontStyle);

  return new flutter.TextStyle({
    fontSize: style.fontSize,
    fontWeight: fontWeight,
    fontFamily: fontFamily,
    fontStyle: fontStyle,
    letterSpacing: letterSpacing,
    decoration: decoration,
  });
}

// TODO lineSpacing
export function makeTextStyle(node: nodes.ReflectTextNode): flutter.TextStyle {
  const fontColor: flutter.Color = makeColor(node.fills);

  let fontSize: number;
  if (node.fontSize) {
    fontSize = node.fontSize;
  }

  const decoration: flutter.TextDecoration = makeTextDecoration(
    node.textStyle.decoration
  );
  let fontStyle: flutter.FontStyle = makeFontStyle(node.textStyle.fontStyle);

  let fontFamily: string;
  if (node.textStyle) {
    fontFamily = node.textStyle.fontFamily;
  }

  let fontWeight: flutter.FontWeight;
  if (node.textStyle) {
    fontWeight = flutter.FontWeight[`${node.textStyle.fontWeight}`];
  }

  let letterSpacing: number;
  if (node.textStyle.letterSpacing > 0) {
    letterSpacing = node.textStyle.letterSpacing;
  }

  // try to make with themed text style
  try {
    const themedTextStyle = getThemedTextStyleByName(node.textStyle.name);
    return themedTextStyle.copyWith({
      color: fontColor,
    });
  } catch (e) {
    // console.log(`no textstyle for node ${node.name}. skipping to custom textStyle builder. (cannot use theme)`)
    // console.error(e)
  }

  // make and return new text style
  return new flutter.TextStyle({
    color: fontColor,
    fontSize: roundDouble(fontSize),
    fontWeight: fontWeight,
    fontFamily: fontFamily,
    fontStyle: fontStyle,
    letterSpacing: letterSpacing,
    decoration: decoration,
  });
}

export function makeFontStyle(style: core.FontStyle): flutter.FontStyle {
  switch (style) {
    case core.FontStyle.italic:
      return flutter.FontStyle.italic as flutter.Snippet;
    case core.FontStyle.normal:
      return; // not returning any value, since normal is a default value.
  }
}

export function makeTextDecoration(
  textDecoration: core.TextDecoration
): flutter.TextDecoration {
  if (!textDecoration) {
    return;
  }
  let decoration: flutter.TextDecoration;
  if (textDecoration === core.TextDecoration.underline) {
    decoration = flutter.TextDecoration.underline as flutter.Snippet;
  }
  return decoration;
}
