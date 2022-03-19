import {
  parse as parseflags,
  Option,
  Results,
} from "@design-sdk/flags/parsing-strategy-dashdash";

import * as keys from "./keys";

import { flag_key__artwork } from "./--artwork";
import { flag_key__as_wrap } from "./--as-wrap";
import { flag_key__module } from "./--module";
import type {
  HeadingFlag,
  TextElementPreferenceFlag,
  AsParagraphFlag,
  AsTextSpanFlag,
  AsButtonFlag,
  AsInputFlag,
  SimpleBooleanValueFlag,
  FixWHFlag,
  DeclareSpecificationFlag,
  WHDeclarationFlag,
} from "./types";

export type FlagsParseResult = Results & {
  __meta: {
    contains_heading_flag: boolean;
    contains_paragraph_flag: boolean;
    contains_span_flag: boolean;
    contains_button_flag: boolean;
    contains_input_flag: boolean;
    contains_wh_declaration_flag: boolean;
    contains_fix_wh_flag: boolean;
    contains_declare_flag: boolean;
    // ...
    [key: string]: boolean;
  };
};

export function parse(name: string): FlagsParseResult {
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
      __h1_alias_pref,
      __h2_alias_pref,
      __h3_alias_pref,
      __h4_alias_pref,
      __h5_alias_pref,
      __h6_alias_pref,
      __p_alias_pref,
      __textspan_alias_pref,
      //#endregion

      // button
      __button_alias_pref,

      // input
      __input_alias_pref,

      //#region
      __width_alias_pref,
      __max_width_alias_pref,
      __min_width_alias_pref,
      __height_alias_pref,
      __max_height_alias_pref,
      __min_height_alias_pref,
      //#endregion

      //#region
      __fix_width_alias_pref,
      __fix_height_alias_pref,
      //#endregion

      //#region
      __declare_alias_pref,
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
      keys.alias.as_p
    );
    const as_span_flag = handle_single_boolean_flag_alias<AsTextSpanFlag>(
      _raw_parsed,
      keys.alias.as_span
    );

    const as_button_flag = handle_single_boolean_flag_alias<AsButtonFlag>(
      _raw_parsed,
      keys.alias.as_button
    );

    const as_input_flag = handle_single_boolean_flag_alias<AsInputFlag>(
      _raw_parsed,
      keys.alias.as_input
    );

    const wh_declaration_flag =
      transform_wh_declaration_alias_from_raw(_raw_parsed);
    const fix_wh_flag = handle_single_boolean_flag_alias<FixWHFlag>(
      _raw_parsed,
      [...keys.alias.fix_width, ...keys.alias.fix_height]
    );

    const declare_flag =
      handle_single_boolean_flag_alias<DeclareSpecificationFlag>(
        _raw_parsed,
        keys.alias.declare
      );

    return {
      ..._raw_parsed,
      ...as_heading_flag,
      ...(as_paragraph_flag ?? {}),
      ...(as_span_flag ?? {}),
      ...(as_button_flag ?? {}),
      ...(as_input_flag ?? {}),
      ...(wh_declaration_flag ?? {}),
      ...(fix_wh_flag ?? {}),
      ...(declare_flag ?? {}),
      __meta: {
        contains_heading_flag: notempty(as_heading_flag),
        contains_paragraph_flag: notempty(as_paragraph_flag),
        contains_span_flag: notempty(as_span_flag),
        contains_button_flag: notempty(as_button_flag),
        contains_input_flag: notempty(as_input_flag),
        contains_wh_declaration_flag: notempty(as_span_flag),
        contains_fix_wh_flag: notempty(fix_wh_flag),
        contains_declare_flag: notempty(declare_flag),
      },
    };
  } catch (_) {
    // TODO: this can happen when unregistered flag is used. this will be fixed.
    console.error("error while parsing flags", _);
    return {} as any;
  }
}

const notempty = (obj) => Object.keys(obj ?? {}).length > 0;

const _simple_boolean_value_flag_prefernce_mapper = (
  k: string | Array<string>
): Option =>
  Array.isArray(k)
    ? {
        names: k,
        type: "bool",
      }
    : {
        name: k,
        type: "bool",
      };

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
        [c.key]: <T>{ flag: c.key, value: raw[c.key], _raw: String(raw) },
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
    keys.alias.as_h1
  );
  if (_h1_alias) return _h1_alias;

  const _h2_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    keys.alias.as_h2
  );
  if (_h2_alias) return _h2_alias;

  const _h3_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    keys.alias.as_h3
  );
  if (_h3_alias) return _h3_alias;

  const _h4_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    keys.alias.as_h4
  );
  if (_h4_alias) return _h4_alias;

  const _h5_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    keys.alias.as_h5
  );
  if (_h5_alias) return _h5_alias;

  const _h6_alias = handle_single_boolean_flag_alias<HeadingFlag>(
    raw,
    keys.alias.as_h6
  );
  if (_h6_alias) return _h6_alias;
}

const __h1_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_h1
);

const __h2_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_h2
);

const __h3_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_h3
);

const __h4_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_h4
);

const __h5_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_h5
);

const __h6_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_h6
);

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const __p_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_p
);

const __textspan_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_span
);

const __button_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_button
);

const __input_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.as_input
);

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const _simple_custom_string_value_flag_prefernce_mapper = (
  k: string | Array<string>
): Option =>
  Array.isArray(k)
    ? {
        names: k,
        // e.g. 100, 100px, 100%, .
        type: "string",
      }
    : {
        name: k,
        // e.g. 100, 100px, 100%, .
        type: "string",
      };

const __width_alias_pref = _simple_custom_string_value_flag_prefernce_mapper(
  keys.alias.width
);
const __max_width_alias_pref =
  _simple_custom_string_value_flag_prefernce_mapper(keys.alias.max_width);
const __min_width_alias_pref =
  _simple_custom_string_value_flag_prefernce_mapper(keys.alias.min_width);

const __height_alias_pref = _simple_custom_string_value_flag_prefernce_mapper(
  keys.alias.height
);
const __max_height_alias_pref =
  _simple_custom_string_value_flag_prefernce_mapper(keys.alias.max_height);
const __min_height_alias_pref =
  _simple_custom_string_value_flag_prefernce_mapper(keys.alias.min_height);

function transform_wh_declaration_alias_from_raw(raw: { [key: string]: any }): {
  [key: string]: WHDeclarationFlag;
} {
  const handle = (key) => {
    if (raw[key]) {
      return {
        [key]: {
          flag: key,
          value: Number(raw[key]), // TODO: add more parser
          _raw: raw[key] as string,
        } as WHDeclarationFlag,
      };
    }
  };

  return [
    keys.flag_key__width,
    keys.flag_key__min_width,
    keys.flag_key__max_width,

    keys.flag_key__height,
    keys.flag_key__min_height,
    keys.flag_key__max_height,
  ].reduce((acc, c) => {
    const d = handle(c);
    if (d) {
      return {
        ...acc,
        ...d,
      };
    }
    return acc;
  }, {});
}

const __fix_width_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.fix_width
);
const __fix_height_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.fix_height
);

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const __declare_alias_pref = _simple_boolean_value_flag_prefernce_mapper(
  keys.alias.declare
);
