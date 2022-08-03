import { Composer } from ".";
import * as web from "@web-builder/core";
import { nameit, NameCases } from "coli";
import { WidgetDeclarationToken } from "@code-features/module";

export function compose_declaration(
  widget: WidgetDeclarationToken,
  child_composer: Composer // not used
) {
  throw new Error("declaration token handling not implemented");
}
