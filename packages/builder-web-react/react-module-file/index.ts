import { SourceFile } from "coli";

export class ReactModuleFile extends SourceFile {
  constructor({ name, path }: { name: string; path: string }) {
    super({ name, path });
  }
}
