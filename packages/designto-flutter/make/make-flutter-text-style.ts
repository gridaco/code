import * as flutter from "@flutter-builder/flutter";
// import * as core from "@reflect-ui/core";
// import { nodes } from "@design-sdk/core";
// import { makeColor } from ".";
import { TextStyleRepository } from "@design-sdk/figma";
// import { roundDouble } from "../convert";
// import { fontStyle, mapTextDecoration } from "../core-type-mappers";

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

// TODO lineSpacing
/* - use tokenized text manifest instead.
export function makeTextStyle(node: nodes.ReflectTextNode): flutter.TextStyle {
  const fontColor: flutter.Color = makeColor(node.fills);

  let fontSize: number;
  if (node.fontSize) {
    fontSize = node.fontSize;
  }

  const decoration: flutter.TextDecoration = mapTextDecoration(
    node.textStyle.decoration
  );
  let fontStyle: flutter.FontStyle = mapFontStyle(node.textStyle.fontStyle);

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
 */
