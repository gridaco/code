export interface ICodeOutput {
  id: string;
  name: string;
  /**
   * layout, widget code
   */
  code: Code;
  /**
   * main executable code
   */
  main: Code;
  /**
   * ready to use code (for file import)
   */
  scaffold: Code;
}

interface Code {
  raw: string;
}
