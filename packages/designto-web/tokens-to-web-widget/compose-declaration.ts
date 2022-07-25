import { Composer } from ".";
import * as web from "@web-builder/core";
import { nameit, NameCases } from "coli";
import { DeclarationWidgetToken } from "@code-features/module";

export function compose_declaration(
  widget: DeclarationWidgetToken,
  child_composer: Composer // not used
) {
  throw new Error("declaration token handling not implemented");
}
