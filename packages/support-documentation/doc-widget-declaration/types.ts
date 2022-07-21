import type { EsComponentExportingCofnig } from "@designto/config/module-es";
import type { FunctionDeclaration, Literal, Parameter } from "coli";

export interface WidgetModuleInfo {}
export type PropsInfo = Array<Parameter>;
export type PropsDefaultValues = { [key: string]: Literal };
export type WidgetDeclarationInfo =
  | FunctionDeclaration
  | {
      type: EsComponentExportingCofnig["type"] | "unknown";
      identifier: string;
    };
