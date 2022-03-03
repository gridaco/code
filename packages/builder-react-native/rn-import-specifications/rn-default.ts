import { standard_libraries } from "@web-builder/nodejs";
import { Import, ImportDeclaration, ImportSpecifier } from "coli";

const import_stylesheet_text_view_from_react_native = new Import()
  .imports("StyleSheet")
  .and("Text")
  .and("View")
  .from(standard_libraries.react_native.name)
  .make();

/**
 * set param to true to add on imports
 * @returns {ImportDeclaration}
 *
 * Lrean more:
 * - [react-native/inde.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/index.d.ts)
 */
export const reactnative_import = ({
  ...props
}: {
  StyleSheet?: boolean;
  View?: boolean;
  Text?: boolean;
  Image?: boolean;
  Modal?: boolean;
  Pressable?: boolean;
  StatusBar?: boolean;
  TouchableHighlight?: boolean;
  TouchableOpacity?: boolean;
  TouchableWithoutFeedback?: boolean;
  VirtualizedList?: boolean;
  ImageBackground?: boolean;
  Button?: boolean;
  ScrollView?: boolean;
  TextInput?: boolean;
  SafeareaView?: boolean;
  Alert?: boolean;
  Switch?: boolean;
  RefreshControl?: boolean;
  Slider?: boolean;
}) => {
  // make import keywords if props are true
  const imports: string[] = [];
  if (props.StyleSheet) imports.push("StyleSheet");
  if (props.View) imports.push("View");
  if (props.Text) imports.push("Text");
  if (props.Image) imports.push("Image");
  if (props.Modal) imports.push("Modal");
  if (props.Pressable) imports.push("Pressable");
  if (props.StatusBar) imports.push("StatusBar");
  if (props.TouchableHighlight) imports.push("TouchableHighlight");
  if (props.TouchableOpacity) imports.push("TouchableOpacity");
  if (props.TouchableWithoutFeedback) imports.push("TouchableWithoutFeedback");
  if (props.VirtualizedList) imports.push("VirtualizedList");
  if (props.ImageBackground) imports.push("ImageBackground");
  if (props.Button) imports.push("Button");
  if (props.ScrollView) imports.push("ScrollView");
  if (props.TextInput) imports.push("TextInput");
  if (props.SafeareaView) imports.push("SafeareaView");
  if (props.Alert) imports.push("Alert");
  if (props.Switch) imports.push("Switch");
  if (props.RefreshControl) imports.push("RefreshControl");
  if (props.Slider) imports.push("Slider");

  if (imports.length === 0) return null;

  return new ImportDeclaration({
    specifiers: imports.map((i) => new ImportSpecifier({ import: i })),
    source: standard_libraries.react_native.name,
  });
};

/**
 * pre-built import combinations of [`React`, `useState`, `useEffect`]
 */
export const reactnative_imports = {
  /**
   * all necessary imports at once for development convenience
   *
   * `import { StyleSheet, Text, View } from "react-native";`
   */
  import_react_prepacked: import_stylesheet_text_view_from_react_native,
};
