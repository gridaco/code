import { BlockStatement, VariableDeclaration } from "coli";
import { SyntaxKind } from "@coli.codes/core-syntax-kind";
import { StyleSheet, _RNStyleSheetStyle } from "./style-sheet-builder";
import type { ViewStyle, TextStyle, ImageStyle } from "react-native";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export class StyleSheetDeclaration<
  T extends NamedStyles<T> | NamedStyles<any>
> extends VariableDeclaration {
  constructor(
    readonly name: string,
    params: {
      styles: T | NamedStyles<T>;
    }
  ) {
    super(name, {
      initializer: StyleSheet.create(params.styles),
      kind: SyntaxKind.ConstKeyword,
    });
  }
}
