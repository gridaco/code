export interface WebAdditionalCssDeclarationConfig {
  declarations: CssDeclaration[];
}

interface CssDeclaration {
  key: {
    name: string;
    selector: "tag" | "id" | "class";
  };
  style: object;
}
