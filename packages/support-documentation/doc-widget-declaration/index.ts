export function makeWidgetDoc() {}

function makeWidgetDoc_React() {
  return;
}

const make_widget_declaration_doc_for = {
  react: makeWidgetDoc_React,
};

export default make_widget_declaration_doc_for;

export type WidgetDeclarationDocumentation = string;

export { ReactWidgetDeclarationDocBuilder } from "./widget-declaration-doc-builder-react";
export { ReactNativeWidgetDeclarationDocBuilder } from "./widget-declaration-doc-builder-react-native";
export { SolidJSWidgetDeclarationDocBuilder } from "./widget-declaration-doc-builder-solidjs";
