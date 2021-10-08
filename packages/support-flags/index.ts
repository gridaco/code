import { parse as parseflags } from "@design-sdk/flags/parsing-strategy-dashdash";

import { flag_key__artwork } from "./--artwork";
import { flag_key__as_wrap } from "./--as-wrap";

export * from "./types";

export function parse(name: string) {
  try {
    return parseflags(name, [
      {
        name: flag_key__artwork,
        type: "bool",
      },
      {
        name: flag_key__as_wrap,
        type: "bool",
      },
      //. TODO: add other flags under here.
    ]);
  } catch (_) {
    console.error("error while parsing flags", _);
    return {};
  }
}
