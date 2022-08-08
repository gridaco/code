///
/// solid-js/store
///

import { standard_libraries } from "@web-builder/nodejs";
import { Import } from "coli";

export const import_createStore_from_solid_js__store = new Import()
  .imports("createSignal")
  .from(standard_libraries.solid_js.alias.store.name)
  .make();
