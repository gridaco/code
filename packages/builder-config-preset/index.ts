import { config, react } from "@designto/config";
import { Framework, Language } from "@grida/builder-platform-types";

export const react_presets = {
  react_default: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "styled-components",
  },
  react_with_styled_components: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "styled-components",
  },
  react_with_css_in_jsx: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "css-in-jsx",
  },
  react_with_css: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: "css",
  },
};

export const flutter_presets = {
  flutter_default: <config.FlutterFrameworkConfig>{
    framework: Framework.flutter,
    language: Language.dart,
  },
};

export const presets = {
  react: react_presets,
  flutter: flutter_presets,
};

export const all_preset_options__prod = [
  flutter_presets.flutter_default,
  react_presets.react_default,
  react_presets.react_with_styled_components,
  // react_with_css_in_jsx // NOT ON PRODUCTION
  // react_with_css // NOT ON PRODUCTION
];

export const all_preset_options_map__prod = {
  none: null,
  flutter_default: flutter_presets.flutter_default,
  react_default: react_presets.react_default,
  react_with_styled_components: react_presets.react_with_styled_components,
  // react_with_css_in_jsx // NOT ON PRODUCTION
  // react_with_css // NOT ON PRODUCTION
};

export const react_styles: react.ReactStylingStrategy[] = [
  "styled-components",
  "css-in-jsx",
  "css",
];
