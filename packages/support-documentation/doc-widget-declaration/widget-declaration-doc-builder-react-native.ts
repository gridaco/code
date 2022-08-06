import type { ImportDeclaration } from "coli";
import {
  JsxWidgetDeclarationDocBuilder,
  JsxWidgetDeclarationDocUsageExampleBuilder,
} from "./widget-declaration-doc-builder-jsx";
import { reactnative_imports } from "@web-builder/react-native";
import type { WidgetDeclarationInfo, WidgetModuleInfo } from "./types";
import { ReactWidgetDeclarationDocBuilder } from "./widget-declaration-doc-builder-react";

class ReactNativeWidgetDeclarationDocUsageExampleBuilder extends JsxWidgetDeclarationDocUsageExampleBuilder {
  constructor(p: { identifier: string; sourceuri?: string }) {
    super(p);
  }

  protected partImportReactNative() {
    return reactnative_imports.import_react_native_prepacked;
  }

  protected partImportFramework() {
    return this.partImportReactNative();
  }

  protected partImport(): ImportDeclaration | undefined {
    // TODO: module import example not supproted
    return undefined;
  }
}

export class ReactNativeWidgetDeclarationDocBuilder extends ReactWidgetDeclarationDocBuilder {
  constructor(p: {
    module: WidgetModuleInfo;
    declaration: WidgetDeclarationInfo;
    params: any;
    defaultValues: any;
    sourceuri?: string;
  }) {
    super(p);
  }

  protected partExample() {
    const snippet = new ReactNativeWidgetDeclarationDocUsageExampleBuilder({
      identifier: this.widgetname,
      sourceuri: this.sourceuri,
    }).snippet();
    return `@example\n${snippet}`;
  }
}
