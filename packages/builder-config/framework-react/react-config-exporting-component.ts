export type ReactComponentExportingCofnig =
  | ReactComponentExportingConfig_ExportDefaultAnonymousFunctionalComponent
  | ReactComponentExportingConfig_ExportNamedFunction
  | ReactComponentExportingConfig_ExportDefaultAnonymousClassComponent
  | ReactComponentExportingConfig_ExportNamedClassComponent;

export type ReactFunctionalComponentDeclarationSyntaxChoice =
  | "function"
  | "inlinefunction";

export type ReactComponentExportDeclarationSyntaxChoice =
  | "export"
  | "export-default";

/**
 * ```tsx
 * export default function () { ... }
 * ```
 */
export interface ReactComponentExportingConfig_ExportDefaultAnonymousFunctionalComponent {
  type: "export-default-anonymous-functional-component";
  exporting_position: "with-declaration";
  declaration_syntax_choice: ReactFunctionalComponentDeclarationSyntaxChoice;
  export_declaration_syntax_choice: "export-default";
}

/**
 * ```tsx
 * export function () { ... } +@
 * // or
 * export default function () { ... } +@
 * ```
 */
export interface ReactComponentExportingConfig_ExportNamedFunction {
  type: "export-named-functional-component";
  exporting_position: react_component_symantic_export_token_location;
  declaration_syntax_choice: ReactFunctionalComponentDeclarationSyntaxChoice;
  export_declaration_syntax_choice: ReactComponentExportDeclarationSyntaxChoice;
}

/**
 * ```tsx
 * export default class { ... }
 * ```
 */
export interface ReactComponentExportingConfig_ExportDefaultAnonymousClassComponent {
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
export interface ReactComponentExportingConfig_ExportNamedClassComponent {
  type: "export-named-class-component";
  exporting_position: react_component_symantic_export_token_location;
  export_declaration_syntax_choice: ReactComponentExportDeclarationSyntaxChoice;
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
export type react_component_symantic_export_token_location =
  // export function A ...
  | "with-declaration"
  // function A ... export { A }
  | "after-declaration"
  // function A ... <other-blocks> ... export { A }
  | "end-of-file";
