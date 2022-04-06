import {
  CallExpression,
  ExpressionStatement,
  Identifier,
  ObjectLiteralExpression,
  PropertyAccessExpression,
} from "coli";
import type { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type _RNStyleSheetStyle = ViewStyle | TextStyle | ImageStyle;

/**
 * StlesSheet reflection builder with CoLI
 */
export class StyleSheet {
  private static identifier = new Identifier("StyleSheet");

  /**
   * returns CoLI object - `StyleSheet.create({...})`
   * @param style
   * @returns
   */
  static create(style: _RNStyleSheetStyle) {
    return new CallExpression(
      new PropertyAccessExpression(this.identifier, "create"),
      new ObjectLiteralExpression({
        properties: style as { [key: string]: any },
      })
    );
  }
}
