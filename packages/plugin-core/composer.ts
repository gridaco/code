import { Plugin } from "./plugin";
import type { TPlugin } from "./types";

export function composePlugin(input: TPlugin): Plugin {
  if (input instanceof Plugin) {
    return input;
  }

  if (typeof input === "string") {
    return composeBuiltinPluginByName(input);
  }

  if (Array.isArray(input)) {
    return composeBuiltinPluginByNameAndParams(input[0], input[1]);
  }

  // TODO: support other seeding options
  throw new Error("invalid plugin");
}

function composeBuiltinPluginByName(name: string): Plugin {
  throw new Error("not implemented");
}

function composeBuiltinPluginByNameAndParams(
  name: string,
  params: object
): Plugin {
  throw new Error("not implemented");
}
