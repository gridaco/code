import type { ImportDeclaration } from "coli";
import {
  JsxWidgetDeclarationDocBuilder,
  JsxWidgetDeclarationDocUsageExampleBuilder,
} from "./widget-declaration-doc-builder-jsx";
import { react_imports } from "@web-builder/react-core";
import type { WidgetDeclarationInfo, WidgetModuleInfo } from "./types";

class ReactWidgetDeclarationDocUsageExampleBuilder extends JsxWidgetDeclarationDocUsageExampleBuilder {
  constructor(p: { identifier: string; sourceuri?: string }) {
    super(p);
  }

  protected partImportReact() {
    return react_imports.import_react_minimal;
  }

  protected partImportFramework() {
    return this.partImportReact();
  }

  protected partImport(): ImportDeclaration | undefined {
    // TODO: module import example not supproted
    return undefined;
  }
}

export class ReactWidgetDeclarationDocBuilder extends JsxWidgetDeclarationDocBuilder {
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
    const snippet = new ReactWidgetDeclarationDocUsageExampleBuilder({
      identifier: this.widgetname,
      sourceuri: this.sourceuri,
    }).snippet();
    return `@example\n${snippet}`;
  }
}
