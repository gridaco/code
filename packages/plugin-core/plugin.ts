import type { Framework } from "@grida/builder-platform-types";
import type { CodeLifeCycleContext } from "./types";

export interface IPlugin {
  framework: Framework | "*";
  apply(context: CodeLifeCycleContext): void;
}

export abstract class Plugin implements IPlugin {
  framework: Framework | "*";

  constructor(args: { framework: Framework | "*" }) {
    this.framework = args.framework;
  }

  abstract apply(context: any): void;
}
