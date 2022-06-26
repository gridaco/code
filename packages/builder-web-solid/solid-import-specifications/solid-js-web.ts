///
/// solid-js/web
///

import { standard_libraries } from "@web-builder/nodejs";
import { Import } from "coli";

/**
 * CoLI: `import React from "react";`
 */
export const import_render_from_solid_js__web = new Import()
  .imports("render")
  .from(standard_libraries.solid_js.alias!.web)
  .make();
