import VanillaTextFitPlugin from "@code-plugin/text-fit";
import { TPlugin, composePlugin as composeAnyPlugin } from "@code-plugin/core";

const BUILTIN_PLUGINS = {
  "@code-plugin/text-fit": VanillaTextFitPlugin,
};

function resolver(name, params) {
  if (name in BUILTIN_PLUGINS) {
    return new BUILTIN_PLUGINS[name](params);
  }
}

export function composePlugin(input: TPlugin) {
  return composeAnyPlugin(input, resolver);
}
