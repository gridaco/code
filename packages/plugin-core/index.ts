interface ICodePluginBase {
  apply(context: any): void;
}

export default abstract class Plugin implements ICodePluginBase {
  apply(context: any) {}
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
