///
/// This contains default and fundamental imports required for using react library
///

import { standard_libraries } from "@web-builder/nodejs";
import { Import } from "coli";

/**
 * CoLI: `import { h } from "preact";`
 */
const import_h_from_preact = new Import()
  .imports("h")
  .from(standard_libraries.preact.name)
  .make();

/**
 * CoLI: `import { h, useState } from "preact";`
 */
const import_preact_and_use_state_from_preact = new Import()
  .imports("h", "useState")
  .from(standard_libraries.preact.name)
  .make();

/**
 * CoLI: `import { h, useState, useEffect } from "preact";`
 */
const import_preact_and_use_state_and_use_effect_from_preact = new Import()
  .imports("h", "useState", "useEffect")
  .from(standard_libraries.preact.name)
  .make();

/**
 * CoLI: `import { useState } from "preact";`
 */
const import_use_state_from_preact = new Import()
  .imports("useState")
  .from(standard_libraries.preact.name)
  .make();

/**
 * pre-built import combinations of [`h`, `useState`, `useEffect`]
 */
export const preact_imports = {
  /**
   * all necessary imports at once for development convenience
   *
   * `import { h, useState, useEffect } from "preact";`
   */
  import_preact_prepacked:
    import_preact_and_use_state_and_use_effect_from_preact,

  /**
   * minimal version of react import - import only `h`.
   *
   * `import { h } from "preact";`
   */
  import_react_minimal: import_h_from_preact,

  ///////////////////////////////////////////////

  /**
   * `import { h } from "preact";`
   */
  import_h_from_preact,

  /**
   *`import { h, useState } from "preact";`
   */
  import_preact_and_use_state_from_preact,

  /**
   *`import { useState } from "preact";`
   */
  import_use_state_from_preact,

  /**
   *`import { h, useState, useEffect } from "preact";`
   */
  import_preact_and_use_state_and_use_effect_from_preact,
};
