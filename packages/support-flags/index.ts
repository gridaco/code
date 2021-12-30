import { parse as parseflags } from "@design-sdk/flags/parsing-strategy-dashdash";

import { flag_key__artwork } from "./--artwork";
import { flag_key__as_wrap } from "./--as-wrap";

// prettier-ignore
import { flag_key__as_h1, flag_key__as_heading1, flag_key__as_headline1, flag_key__h1, flag_key__heading1, flag_key__headline1 } from "./--as-h1";
// prettier-ignore
import { flag_key__as_h2, flag_key__as_heading2, flag_key__as_headline2, flag_key__h2, flag_key__heading2, flag_key__headline2 } from "./--as-h2";
// prettier-ignore
import { flag_key__as_h3, flag_key__as_heading3, flag_key__as_headline3, flag_key__h3, flag_key__heading3, flag_key__headline3 } from "./--as-h3";
// prettier-ignore
import { flag_key__as_h4, flag_key__as_heading4, flag_key__as_headline4, flag_key__h4, flag_key__heading4, flag_key__headline4 } from "./--as-h4";
// prettier-ignore
import { flag_key__as_h5, flag_key__as_heading5, flag_key__as_headline5, flag_key__h5, flag_key__heading5, flag_key__headline5 } from "./--as-h5";
// prettier-ignore
import { flag_key__as_h6, flag_key__as_heading6, flag_key__as_headline6, flag_key__h6, flag_key__heading6, flag_key__headline6 } from "./--as-h6";

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
      //#region
      ...__h1_alias,
      ...__h2_alias,
      ...__h3_alias,
      ...__h4_alias,
      ...__h5_alias,
      ...__h6_alias,
      //#endregion
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

const __h1_alias = [
  flag_key__as_h1,
  flag_key__as_heading1,
  flag_key__as_headline1,
  flag_key__h1,
  flag_key__heading1,
  flag_key__headline1,
].map((k) => ({
  name: k,
  type: "bool",
}));

const __h2_alias = [
  flag_key__as_h2,
  flag_key__as_heading2,
  flag_key__as_headline2,
  flag_key__h2,
  flag_key__heading2,
  flag_key__headline2,
].map((k) => ({
  name: k,
  type: "bool",
}));

const __h3_alias = [
  flag_key__as_h3,
  flag_key__as_heading3,
  flag_key__as_headline3,
  flag_key__h3,
  flag_key__heading3,
  flag_key__headline3,
].map((k) => ({
  name: k,
  type: "bool",
}));

const __h4_alias = [
  flag_key__as_h4,
  flag_key__as_heading4,
  flag_key__as_headline4,
  flag_key__h4,
  flag_key__heading4,
  flag_key__headline4,
].map((k) => ({
  name: k,
  type: "bool",
}));

const __h5_alias = [
  flag_key__as_h5,
  flag_key__as_heading5,
  flag_key__as_headline5,
  flag_key__h5,
  flag_key__heading5,
  flag_key__headline5,
].map((k) => ({
  name: k,
  type: "bool",
}));

const __h6_alias = [
  flag_key__as_h6,
  flag_key__as_heading6,
  flag_key__as_headline6,
  flag_key__h6,
  flag_key__heading6,
  flag_key__headline6,
].map((k) => ({
  name: k,
  type: "bool",
}));
