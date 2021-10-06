import { parse as parseflags } from "@design-sdk/flags/parsing-strategy-dashdash";

import { ArtworkFlag, artwork_flag_key } from "./--artwork";

export * from "./types";

export function parse(name: string) {
  try {
    return parseflags(name, [
      {
        name: artwork_flag_key,
        type: "bool",
      },
      //. TODO: add other flags under here.
    ]);
  } catch (_) {
    console.error("error while parsing flags", _);
    return {};
  }
}
