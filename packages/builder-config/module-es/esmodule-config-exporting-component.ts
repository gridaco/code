export type EsComponentExportingCofnig =
  | EsComponentExportingConfig_ExportDefaultAnonymousFunctionalComponent
  | EsComponentExportingConfig_ExportNamedFunction
  | EsComponentExportingConfig_ExportDefaultAnonymousClassComponent
  | EsComponentExportingConfig_ExportNamedClassComponent;

export type EsFunctionalComponentDeclarationSyntaxChoice =
  | "function"
  | "inlinefunction";

export type EsComponentExportDeclarationSyntaxChoice =
  | "export"
  | "export-default";

/**
 * ```tsx
 * export default function () { ... }
 * ```
 */
export interface EsComponentExportingConfig_ExportDefaultAnonymousFunctionalComponent {
  type: "export-default-anonymous-functional-component";
  exporting_position: "with-declaration";
  declaration_syntax_choice: EsFunctionalComponentDeclarationSyntaxChoice;
  export_declaration_syntax_choice: "export-default";
}

/**
 * ```tsx
 * export function () { ... } +@
 * // or
 * export default function () { ... } +@
 * ```
 */
export interface EsComponentExportingConfig_ExportNamedFunction {
  type: "export-named-functional-component";
  exporting_position: es_component_symantic_export_token_location;
  declaration_syntax_choice: EsFunctionalComponentDeclarationSyntaxChoice;
  export_declaration_syntax_choice: EsComponentExportDeclarationSyntaxChoice;
}

/**
 * ```tsx
 * export default class { ... }
 * ```
 */
export interface EsComponentExportingConfig_ExportDefaultAnonymousClassComponent {
  type: "export-anonymous-class-component";
  exporting_position: "with-declaration";
  export_declaration_syntax_choice: "export-default";
}

/**
 * ```tsx
 * export class Component {} +@
 * // or
 * export default class Component {} +@
 * ```
 */
export interface EsComponentExportingConfig_ExportNamedClassComponent {
  type: "export-named-class-component";
  exporting_position: es_component_symantic_export_token_location;
  export_declaration_syntax_choice: EsComponentExportDeclarationSyntaxChoice;
}

/**
 * symantic location that export token can be located
 *
 * ```ts
 * // `with-declaration`
 * export function A () {}
 * var _other_blocks;
 * ...
 *
 * // `after-declaration`
 * function A () {}
 * export { A }
 * var _other_blocks;
 *
 * // `end-of-file`
 * function A () {}
 * var _other_blocks;
 * export { A }
 * ```
 */
export type es_component_symantic_export_token_location =
  // export function A ...
  | "with-declaration"
  // function A ... export { A }
  | "after-declaration"
  // function A ... <other-blocks> ... export { A }
  | "end-of-file";
