///
/// this file holds the web-builder supported reflect-ui universal web platform components import path definition.
///

/**
 * import { Button } from "@reflect-ui/\<platform\>/`.`"
 */
const IMPORT_BUTTON_NAMED = ".";

/**
 * import { Button } from "@reflect-ui/\<platform\>/`button`"
 */
const IMPORT_BUTTON_DEFAULT = "/button";

/**
 * import { `Button` } from "@reflect-ui/<platform>"
 */
const IMPORT_BUTTON_NAME = "Button";

export const BUTTON_IMPORT = {
  name: IMPORT_BUTTON_NAME,
  named: IMPORT_BUTTON_NAMED,
  default: IMPORT_BUTTON_DEFAULT,
};

export const TEXT_IMPORT = {
  name: "Typography",
  named: ".",
  default: "/typography",
};
