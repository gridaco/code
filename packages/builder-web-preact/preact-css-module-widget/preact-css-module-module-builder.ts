import { ReactCssModuleBuilder } from "@web-builder/react";
import { ImportDeclaration } from "coli";
import { preact_imports } from "../preact-import-specifications";

export class PreactCssModuleBuilder extends ReactCssModuleBuilder {
  protected partImports(): Array<ImportDeclaration> {
    return [this.partImportPreact(), this.partImportModuleCss()];
  }

  protected partImportReact(): never {
    throw 'do not use "react" from "preact" module. this is forbidden.';
  }

  protected partImportPreact(): ImportDeclaration {
    return preact_imports.import_h_from_preact;
  }
}
