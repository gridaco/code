import type { ImportDeclaration } from "coli";
import {
  JsxWidgetDeclarationDocBuilder,
  JsxWidgetDeclarationDocUsageExampleBuilder,
} from "./widget-declaration-doc-builder-jsx";
import { solid_js_imports } from "@web-builder/solid-js";
import type { WidgetDeclarationInfo, WidgetModuleInfo } from "./types";

class SolidJSWidgetDeclarationDocUsageExampleBuilder extends JsxWidgetDeclarationDocUsageExampleBuilder {
  constructor(p: { identifier: string; sourceuri?: string }) {
    super(p);
  }

  protected partImportSolid() {
    return solid_js_imports.render;
  }

  protected partImportFramework() {
    return this.partImportSolid();
  }

  protected partImport(): ImportDeclaration | undefined {
    // TODO: module import example not supproted
    return undefined;
  }
}

export class SolidJSWidgetDeclarationDocBuilder extends JsxWidgetDeclarationDocBuilder {
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
    const snippet = new SolidJSWidgetDeclarationDocUsageExampleBuilder({
      identifier: this.widgetname,
      sourceuri: this.sourceuri,
    }).snippet();
    return `@example\n${snippet}`;
  }
}
