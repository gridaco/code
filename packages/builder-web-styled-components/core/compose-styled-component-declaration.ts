import { StylableJSXElementConfig, WidgetWithStyle } from "@web-builder/core";
import { nameVariable, NameCases } from "@coli.codes/naming";
import type { NamePreference } from "./types";
import { handle } from "@coli.codes/builder";
import { StyledComponentDeclaration } from "./styled-component-declaration";
import type { Html5IdentifierNames } from "@coli.codes/jsx-core";
import { Framework } from "@grida/builder-platform-types";

export function composeStyledComponentVariableDeclaration(
  widgetConfig: WidgetWithStyle,
  preferences: {
    name?: NamePreference;
    framework?: Framework;
  }
): StyledComponentDeclaration {
  const jsxconfg = widgetConfig.jsxConfig() as StylableJSXElementConfig;

  /// region name
  let varname: string;
  const namePref = preferences.name;
  if (namePref.overrideFinalName) {
    varname = namePref.overrideFinalName;
  } else if (namePref.overrideKeyName) {
    varname = nameVariable(namePref.overrideKeyName, {
      case: NameCases.pascal,
    }).name;
  } else {
    varname = namePref.namer.nameit(widgetConfig.key.name, {
      case: NameCases.pascal,
    }).name;
  }
  ///

  const style_data = widgetConfig.finalStyle;
  /**
   * if the style is null, it means don't make element as a styled component at all. if style is a empty object, it means to make a empty styled component.
   */
  const should_be_styled = style_data !== null;
  if (should_be_styled) {
    return new StyledComponentDeclaration(varname, {
      type:
        preferences.framework == Framework.solid
          ? "parameter-call"
          : "tagged-template",
      style: style_data,
      identifier: handle(jsxconfg.tag).name as Html5IdentifierNames,
    });
  }
}
