export interface ICodeOutput {
  id: string;
  name: string;
  code: Code;
  scaffold: Code;
}

interface Code {
  raw: string;
}
