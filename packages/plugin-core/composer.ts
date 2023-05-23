import type { Plugin } from "./plugin";
import type { TPlugin } from "./types";

type Resolver = (name: string, params: object) => Plugin;

export function composePlugin(input: TPlugin, resolver?: Resolver): Plugin {
  if (typeof input === "object") {
    // to avoid circular dependency, we don't use `instanceof` here.
    // need better inspection.
    if ("apply" in input) {
      return input;
    }
  }

  if (typeof input === "string") {
    return composePluginByName(input, resolver);
  }

  if (Array.isArray(input)) {
    const size = input.length;
    switch (size) {
      case 1: {
        return composePluginByName(input[0], resolver);
      }
      case 2: {
        return composePluginByNameAndParams(input[0], input[1], resolver);
      }
      default: {
        throw new Error("invalid plugin");
      }
    }
  }

  // TODO: support other seeding options
  throw new Error("invalid plugin");
}

function composePluginByName(name: string, resolver?: Resolver): Plugin {
  return composePluginByNameAndParams(name, {}, resolver);
}

function composePluginByNameAndParams(
  name: string,
  params: object,
  resolver?: Resolver
): Plugin {
  if (resolver) {
    return resolver(name, params);
  }

  try {
    const cls = require(name).default;
    return new cls(params);
  } catch (e) {
    throw new Error(`plugin not found: ${name}`);
  }
}
