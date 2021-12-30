import { parse as parseflags } from "@design-sdk/flags/parsing-strategy-dashdash";

import * as keys from "./keys";

import { flag_key__artwork } from "./--artwork";
import { flag_key__as_wrap } from "./--as-wrap";
import { flag_key__module } from "./--module";
import type {
  HeadingFlag,
  TextElementPreferenceFlag,
  AsParagraphFlag,
  AsTextSpanFlag,
  SimpleBooleanValueFlag,
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
      ...__p_alias_pref,
      ...__textspan_alias_pref,
      //#endregion
      {
        name: flag_key__module,
        type: "bool", // TODO: support string also.
      },
      //. TODO: add other flags under here.
    ]);

    const as_heading_flag = transform_heading_alias_from_raw(_raw_parsed);
    const as_paragraph_flag = handle_single_boolean_flag_alias<AsParagraphFlag>(
      _raw_parsed,
      __p_alias
    );
    const as_span_flag = handle_single_boolean_flag_alias<AsTextSpanFlag>(
      _raw_parsed,
      __textspan_alias
    );

    return {
      ..._raw_parsed,
      ...as_heading_flag,
      ...(as_paragraph_flag ?? {}),
      ...(as_span_flag ?? {}),
      __meta: {
        contains_heading_flag: notempty(as_heading_flag),
        contains_paragraph_flag: notempty(as_paragraph_flag),
        contains_span_flag: notempty(as_span_flag),
      },
    };
  } catch (_) {
    console.error("error while parsing flags", _);
    return {};
  }
}

const notempty = (obj) => Object.keys(obj ?? {}).length > 0;

const _simple_boolean_value_flag_prefernce_mapper = (k) => ({
  name: k,
  type: "bool",
});

function handle_single_boolean_flag_alias<T extends SimpleBooleanValueFlag>(
  raw: { [key: string]: boolean },
  alias: string[]
) {
  // e.g. `[ { h1: true } ]`
  const mapped: { key: string; value: boolean }[] = alias.map((_) => ({
    key: _,
    value: raw[_],
  }));

  // e.g `{ h1: {flag: "h1", value: true} }`
  const converted: { [key: string]: T } = mapped.reduce((acc, c, i) => {
    if (raw[c.key]) {
      return {
        ...acc,
        [c.key]: <T>{ flag: c.key, value: raw[c.key] },
      };
    }
    return acc;
  }, {});

  if (Object.keys(converted).length > 0) return converted;
}

function transform_heading_alias_from_raw(raw: { [key: string]: boolean }): {
  [key: string]: HeadingFlag;
} {
  const _h1_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    __h1_alias
  );
  if (_h1_alias) return _h1_alias;

  const _h2_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    __h2_alias
  );
  if (_h2_alias) return _h2_alias;

  const _h3_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    __h3_alias
  );
  if (_h3_alias) return _h3_alias;

  const _h4_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    __h4_alias
  );
  if (_h4_alias) return _h4_alias;

  const _h5_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    __h5_alias
  );
  if (_h5_alias) return _h5_alias;

  const _h6_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    __h6_alias
  );
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
const __h1_alias_pref = __h1_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);

const __h2_alias = [
  keys.flag_key__as_h2,
  keys.flag_key__as_heading2,
  keys.flag_key__as_headline2,
  keys.flag_key__h2,
  keys.flag_key__heading2,
  keys.flag_key__headline2,
];
const __h2_alias_pref = __h2_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);

const __h3_alias = [
  keys.flag_key__as_h3,
  keys.flag_key__as_heading3,
  keys.flag_key__as_headline3,
  keys.flag_key__h3,
  keys.flag_key__heading3,
  keys.flag_key__headline3,
];
const __h3_alias_pref = __h3_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);

const __h4_alias = [
  keys.flag_key__as_h4,
  keys.flag_key__as_heading4,
  keys.flag_key__as_headline4,
  keys.flag_key__h4,
  keys.flag_key__heading4,
  keys.flag_key__headline4,
];
const __h4_alias_pref = __h4_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);

const __h5_alias = [
  keys.flag_key__as_h5,
  keys.flag_key__as_heading5,
  keys.flag_key__as_headline5,
  keys.flag_key__h5,
  keys.flag_key__heading5,
  keys.flag_key__headline5,
];
const __h5_alias_pref = __h5_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);

const __h6_alias = [
  keys.flag_key__as_h6,
  keys.flag_key__as_heading6,
  keys.flag_key__as_headline6,
  keys.flag_key__h6,
  keys.flag_key__heading6,
  keys.flag_key__headline6,
];
const __h6_alias_pref = __h6_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const __p_alias = [
  keys.flag_key__as_p,
  keys.flag_key__as_paragraph,
  keys.flag_key__paragraph,
];
const __p_alias_pref = __p_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);

const __textspan_alias = [
  keys.flag_key__as_span,
  keys.flag_key__as_text_span,
  keys.flag_key__as_textspan,
  keys.flag_key__text_span,
  keys.flag_key__textspan,
];
const __textspan_alias_pref = __textspan_alias.map(
  _simple_boolean_value_flag_prefernce_mapper
);
