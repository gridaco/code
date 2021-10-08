export type ReactComponentSyntax =
  | VariableDeclarationSyntax
  | FunctionDeclarationSyntax
  | ClassDeclarationSyntax;

type FunctionDeclarationSyntax = "function";
type ClassDeclarationSyntax = "class";
type VariableDeclarationSyntax = "const" | "let" | "var";
