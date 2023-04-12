import { Framework } from "@grida/builder-platform-types";

type PluginHook = {
  tap: (name: string, fn: (config: any) => void) => void;
};

type CodeLifeCycleContext = {
  hooks: {
    afterVanillaCSSBundle: PluginHook;
  };
};

interface ICodePluginBase {
  framework: Framework | "*";
  apply(context: CodeLifeCycleContext): void;
}

export default abstract class Plugin implements ICodePluginBase {
  framework: Framework | "*";

  constructor(args: { framework: Framework | "*" }) {
    this.framework = args.framework;
  }

  abstract apply(context: any): void;
}

export type UseCodePluginByPresetNameSpec = string;

export type UseCodePluginByPresetNameAndParamsForInlineJsonUseSpec<
  K extends string,
  P extends object
> = [K, P];

export type CodePlugin =
  | UseCodePluginByPresetNameSpec
  | UseCodePluginByPresetNameAndParamsForInlineJsonUseSpec<any, any>
  | ICodePluginBase
  | Plugin;
