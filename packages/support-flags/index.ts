import { parse as parseflags } from "@design-sdk/flags/parsing-strategy-dashdash";

import { flag_key__artwork } from "./--artwork";
import { flag_key__as_wrap } from "./--as-wrap";
import { flag_key__module } from "./--module";
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
      {
        name: flag_key__module,
        type: "bool", // TODO: support string also.
      },
      //. TODO: add other flags under here.
    ]);
  } catch (_) {
    console.error("error while parsing flags", _);
    return {};
  }
}
