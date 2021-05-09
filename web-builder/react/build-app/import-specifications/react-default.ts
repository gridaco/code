///
/// This contains default and fundamental imports required for using react library
///

import { standard_libraries } from "@coli.codes/nodejs-builder";
import { Import } from "coli";

/**
 * CoLI: `import React from "react";`
 */
const import_react_from_react = new Import()
  .importDefault("React")
  .from(standard_libraries.react.name)
  .make();

/**
 * CoLI: `import React, { useState } from "react";`
 */
const import_react_and_use_state_from_react = new Import()
  .importDefault("React")
  .import("useState")
  .from(standard_libraries.react.name)
  .make();

/**
 * CoLI: `import React, { useState, useEffect } from "react";`
 */
const import_react_and_use_state_and_use_effect_from_react = new Import()
  .importDefault("React")
  .import("useState")
  .import("useEffect")
  .from(standard_libraries.react.name)
  .make();

/**
 * CoLI: `import { useState } from "react";`
 */
const import_use_state_from_react = new Import()
  .import("useState")
  .from(standard_libraries.react.name)
  .make();

/**
 * CoLI: `import { render } from "react-dom";`
 */
const import_render_from_react_dom = new Import()
  .import("render")
  .from(standard_libraries.react_dom.name)
  .make();

/**
 * pre-built import combinations of [`React`, `useState`, `useEffect`]
 */
export const react_imports = {
  /**
   * all necessary imports at once for development convenience
   *
   * `import React, { useState, useEffect } from "react";`
   */
  import_react_prepacked: import_react_and_use_state_and_use_effect_from_react,

  /**
   * minimal version of react import - import only `React`.
   *
   * `import React from "react";`
   */
  import_react_minimal: import_react_from_react,

  ///////////////////////////////////////////////

  /**
   * `import React from "react";`
   */
  import_react_from_react,

  /**
   * `import { render } from "react-dom";`
   */
  import_render_from_react_dom,

  /**
   *`import React, { useState } from "react";`
   */
  import_react_and_use_state_from_react,

  /**
   *`import { useState } from "react";`
   */
  import_use_state_from_react,

  /**
   *`import React, { useState, useEffect } from "react";`
   */
  import_react_and_use_state_and_use_effect_from_react,
};
