///
/// This contains default and fundamental imports required for using solid-js library
///

import { standard_libraries } from "@web-builder/nodejs";
import { Import } from "coli";

import { import_render_from_solid_js__web } from "./solid-js-web";
import { import_createStore_from_solid_js__store } from "./solid-js-store";

const import_createMemo_from_solid_js = new Import()
  .imports("createMemo")
  .from(standard_libraries.solid_js.name)
  .make();

const import_createSignal_from_solid_js = new Import()
  .imports("createSignal")
  .from(standard_libraries.solid_js.name)
  .make();

export const solid_js_imports = {
  render: import_render_from_solid_js__web,
  createMemo: import_createMemo_from_solid_js,
  createSignal: import_createSignal_from_solid_js,
  createStore: import_createStore_from_solid_js__store,
};
