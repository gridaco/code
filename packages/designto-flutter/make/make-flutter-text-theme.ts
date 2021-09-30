import { TextStyleRepository, TextThemeStyles } from "@design-sdk/figma";
import * as flutter from "@flutter-builder/flutter";
import { makeTextStyleFromDesign } from "./make-flutter-text-style";

export function makeTextTheme(): flutter.TextTheme {
  function buildTextStyle(style: TextThemeStyles): flutter.TextStyle {
    try {
      return makeTextStyleFromDesign(
        TextStyleRepository.getDefaultDesignTextStyleFromRegistry(style)
      );
    } catch (e) {
      // console.warn('failed to build textstyle. err:', e)
    }
  }

  return new flutter.TextTheme({
    headline1: buildTextStyle(TextThemeStyles.headline1),
    headline2: buildTextStyle(TextThemeStyles.headline2),
    headline3: buildTextStyle(TextThemeStyles.headline3),
    headline4: buildTextStyle(TextThemeStyles.headline4),
    headline5: buildTextStyle(TextThemeStyles.headline5),
    headline6: buildTextStyle(TextThemeStyles.headline6),
    subtitle1: buildTextStyle(TextThemeStyles.subtitle1),
    subtitle2: buildTextStyle(TextThemeStyles.subtitle2),
    bodyText1: buildTextStyle(TextThemeStyles.bodyText1),
    bodyText2: buildTextStyle(TextThemeStyles.bodyText2),
    button: buildTextStyle(TextThemeStyles.button),
    caption: buildTextStyle(TextThemeStyles.caption),
    overline: buildTextStyle(TextThemeStyles.overline),
  });
}
