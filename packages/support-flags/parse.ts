import { parse as parseflags } from "@design-sdk/flags/parsing-strategy-dashdash";

import * as keys from "./keys";

import { flag_key__artwork } from "./--artwork";
import { flag_key__as_wrap } from "./--as-wrap";
import { flag_key__module } from "./--module";
import type {
  HeadingFlag,
  AsHeading1Flag,
  AsHeading2Flag,
  AsHeading3Flag,
  AsHeading4Flag,
  AsHeading5Flag,
  AsHeading6Flag,
} from "./types";

export function parse(name: string) {
  try {
    const _raw_parsed = parseflags(name, [
      {
        name: flag_key__artwork,
        type: "bool",
      },
      {
        name: flag_key__as_wrap,
        type: "bool",
      },
      //#region
      ...__h1_alias_pref,
      ...__h2_alias_pref,
      ...__h3_alias_pref,
      ...__h4_alias_pref,
      ...__h5_alias_pref,
      ...__h6_alias_pref,
      //#endregion
      {
        name: flag_key__module,
        type: "bool", // TODO: support string also.
      },
      //. TODO: add other flags under here.
    ]);

    const heading_flag = transform_heading_alias_from_raw(_raw_parsed);

    return {
      ..._raw_parsed,
      ...heading_flag,
      __meta: {
        contains_heading_flag: !!Object.keys(heading_flag).length,
      },
    };
  } catch (_) {
    console.error("error while parsing flags", _);
    return {};
  }
}

function transform_heading_alias_from_raw(raw: { [key: string]: boolean }): {
  [key: string]: HeadingFlag;
} {
  function handle_single_heading_alias(alias: string[]) {
    // e.g. `[ { h1: true } ]`
    const mapped: { key: string; value: boolean }[] = alias.map((_) => ({
      key: _,
      value: raw[_],
    }));

    // e.g `{ h1: {flag: "h1", value: true} }`
    const converted: { [key: string]: HeadingFlag } = mapped.reduce(
      (acc, c, i) => {
        if (raw[c.key]) {
          return {
            ...acc,
            [c.key]: <HeadingFlag>{ flag: c.key, value: raw[c.key] },
          };
        }
        return acc;
      },
      {}
    );

    if (Object.keys(converted).length > 0) return converted;
  }

  const _h1_alias = handle_single_heading_alias(__h1_alias);
  if (_h1_alias) return _h1_alias;

  const _h2_alias = handle_single_heading_alias(__h2_alias);
  if (_h2_alias) return _h2_alias;

  const _h3_alias = handle_single_heading_alias(__h3_alias);
  if (_h3_alias) return _h3_alias;

  const _h4_alias = handle_single_heading_alias(__h4_alias);
  if (_h4_alias) return _h4_alias;

  const _h5_alias = handle_single_heading_alias(__h5_alias);
  if (_h5_alias) return _h5_alias;

  const _h6_alias = handle_single_heading_alias(__h6_alias);
  if (_h6_alias) return _h6_alias;
}

const __h1_alias = [
  keys.flag_key__as_h1,
  keys.flag_key__as_heading1,
  keys.flag_key__as_headline1,
  keys.flag_key__h1,
  keys.flag_key__heading1,
  keys.flag_key__headline1,
];
const __h1_alias_pref = __h1_alias.map((k) => ({
  name: k,
  type: "bool",
}));

const __h2_alias = [
  keys.flag_key__as_h2,
  keys.flag_key__as_heading2,
  keys.flag_key__as_headline2,
  keys.flag_key__h2,
  keys.flag_key__heading2,
  keys.flag_key__headline2,
];
const __h2_alias_pref = __h2_alias.map((k) => ({
  name: k,
  type: "bool",
}));

const __h3_alias = [
  keys.flag_key__as_h3,
  keys.flag_key__as_heading3,
  keys.flag_key__as_headline3,
  keys.flag_key__h3,
  keys.flag_key__heading3,
  keys.flag_key__headline3,
];
const __h3_alias_pref = __h3_alias.map((k) => ({
  name: k,
  type: "bool",
}));

const __h4_alias = [
  keys.flag_key__as_h4,
  keys.flag_key__as_heading4,
  keys.flag_key__as_headline4,
  keys.flag_key__h4,
  keys.flag_key__heading4,
  keys.flag_key__headline4,
];
const __h4_alias_pref = __h4_alias.map((k) => ({
  name: k,
  type: "bool",
}));

const __h5_alias = [
  keys.flag_key__as_h5,
  keys.flag_key__as_heading5,
  keys.flag_key__as_headline5,
  keys.flag_key__h5,
  keys.flag_key__heading5,
  keys.flag_key__headline5,
];
const __h5_alias_pref = __h5_alias.map((k) => ({
  name: k,
  type: "bool",
}));

const __h6_alias = [
  keys.flag_key__as_h6,
  keys.flag_key__as_heading6,
  keys.flag_key__as_headline6,
  keys.flag_key__h6,
  keys.flag_key__heading6,
  keys.flag_key__headline6,
];
const __h6_alias_pref = __h6_alias.map((k) => ({
  name: k,
  type: "bool",
}));
