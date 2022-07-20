import type { Declaration, FunctionDeclaration, Identifier } from "coli";
import { WidgetDeclarationDocBuilder } from "./widget-declaration-doc-builder";
import { react_imports } from "@web-builder/react-core";
import type { WidgetModuleInfo } from "./types";
class ReactWidgetDeclarationDocUsageExampleBuilder {
  protected readonly identifier: Identifier;
  protected readonly params;
  protected readonly module: WidgetModuleInfo;
  protected partImportReact() {
    return react_imports.import_react_minimal;
  }
  protected partImport() {}
  protected partUsage() {}
  protected partInstanciation() {
    if (this.params) {
      throw "examples with params not supported yet.";
    } else {
      //
    }
  }
  protected partBody() {}
  public snippet() {
    return "example snippet: >>todo<<";
  }
}

export class ReactWidgetDeclarationDocBuilder extends WidgetDeclarationDocBuilder {
  constructor() {
    super();
  }

  protected partIntro() {
    if (this.anonymous) {
      return ""; // TODO:
    } else {
      return `${this.widgetname}`;
    }
  }

  protected partExample() {
    return new ReactWidgetDeclarationDocUsageExampleBuilder().snippet();
  }

  protected partParams() {
    return "TODO";
  }
  protected partPreview() {
    return "TODO";
  }
  protected partRemarks() {
    return "TODO";
  }

  protected partBrandingFooter() {
    return "TODO";
  }
  protected partGridaMetaComment() {
    return "TODO";
  }
  protected divider() {
    return "---";
  }
  protected break() {
    return "\n";
  }
  //

  public make() {
    const hr = this.divider;
    const br = this.break;

    return [
      this.partIntro(),
      br(),
      hr(),
      this.partExample(),
      hr(),
      this.partParams(),
      br(),
      hr(),
      this.partRemarks(),
      br(),
      hr(),
      this.partPrivateRemarks(),
      this.partBrandingFooter(),
      this.partGridaMetaComment(),
    ]
      .map((i) => i.toString())
      .join("\n");
  }
}
