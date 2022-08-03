import { config, react } from "@grida/builder-config";
import { Framework, Language } from "@grida/builder-platform-types";

const _jsx_component_declaration_style = {
  exporting_style: {
    type: "export-named-functional-component",
    exporting_position: "with-declaration",
    declaration_syntax_choice: "function",
    export_declaration_syntax_choice: "export",
  },
};

export const react_presets = {
  react_default: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "@emotion/styled",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  react_with_styled_components: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "styled-components",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  react_with_emotion_styled: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "@emotion/styled",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  react_with_inline_css: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: {
      type: "inline-css",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  react_with_css_module: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: {
      type: "css-module",
      lang: "css",
      importDefault: "styles",
      loader: "css-loader",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  react_with_css: <config.ReactFrameworkConfig>{
    framework: Framework.react,
    language: Language.tsx,
    styling: { type: "css" },
  },
  component_declaration_style: _jsx_component_declaration_style,
};

export const reactnative_presets = {
  reactnative_default: <config.ReactNativeFrameworkConfig>{
    framework: Framework.reactnative,
    language: Language.tsx,
    svg: null as unknown, // TODO:
    gradient: null as unknown, // TODO:
    styling: {
      type: "react-native-stylesheet",
      module: "react-native",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  reactnative_with_style_sheet: <config.ReactNativeFrameworkConfig>{
    framework: Framework.reactnative,
    language: Language.tsx,
    svg: null as unknown, // TODO:
    gradient: null as unknown, // TODO:
    styling: {
      type: "react-native-stylesheet",
      module: "react-native",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  reactnative_with_styled_components: <config.ReactNativeFrameworkConfig>{
    framework: Framework.reactnative,
    language: Language.tsx,
    svg: null as unknown, // TODO:
    gradient: null as unknown, // TODO:
    styling: {
      type: "styled-components",
      module: "styled-components/native",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  reactnative_with_inline_style: <config.ReactNativeFrameworkConfig>{
    framework: Framework.reactnative,
    language: Language.tsx,
    svg: null as unknown, // TODO:
    gradient: null as unknown, // TODO:
    styling: {
      type: "inline-style",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
};

export const preact_presets = {
  default: <config.PreactFrameworkConfig>{
    framework: Framework.preact,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "@emotion/styled",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  with_styled_components: <config.PreactFrameworkConfig>{
    framework: Framework.preact,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "styled-components",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  with_emotion_styled: <config.PreactFrameworkConfig>{
    framework: Framework.preact,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "@emotion/styled",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  with_inline_css: <config.PreactFrameworkConfig>{
    framework: Framework.preact,
    language: Language.tsx,
    styling: {
      type: "inline-css",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  with_css_module: <config.PreactFrameworkConfig>{
    framework: Framework.preact,
    language: Language.tsx,
    styling: {
      type: "css-module",
      lang: "css",
      importDefault: "styles",
      loader: "css-loader",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  with_css: <config.PreactFrameworkConfig>{
    framework: Framework.preact,
    language: Language.tsx,
    styling: { type: "css" },
  },
  component_declaration_style: _jsx_component_declaration_style,
};

export const solid_presets = {
  solid_with_styled_components: <config.SolidFrameworkConfig>{
    framework: Framework.solid,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "solid-styled-components",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  solid_default: <config.SolidFrameworkConfig>{
    framework: Framework.solid,
    language: Language.tsx,
    styling: {
      type: "styled-components",
      module: "solid-styled-components",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
  solid_with_inline_css: <config.SolidFrameworkConfig>{
    framework: Framework.solid,
    language: Language.tsx,
    styling: {
      type: "inline-css",
    },
    component_declaration_style: _jsx_component_declaration_style,
  },
};

export const vanilla_presets = {
  vanilla_default: <config.VanillaFrameworkConfig>{
    framework: Framework.vanilla,
    language: Language.html,
    imgage_alt: {
      no_alt: true,
    },
  },
};

export const preview_presets = {
  default: <config.VanillaPreviewFrameworkConfig>{
    framework: "preview",
    language: Language.html,
    imgage_alt: {
      no_alt: true,
    },
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
  vanilla: vanilla_presets,
};

export const all_preset_options__prod = [
  flutter_presets.flutter_default,
  react_presets.react_default,
  react_presets.react_with_styled_components,
  preact_presets.default,
  vanilla_presets.vanilla_default,
  // react_with_css_in_jsx // NOT ON PRODUCTION
  // react_with_css // NOT ON PRODUCTION
];

export const all_preset_options_map__prod = {
  none: null,
  flutter_default: flutter_presets.flutter_default,
  react_default: react_presets.react_default,
  react_with_styled_components: react_presets.react_with_styled_components,
  vanilla_default: vanilla_presets.vanilla_default,
  // react_with_css_in_jsx // NOT ON PRODUCTION
  // react_with_css // NOT ON PRODUCTION
};

export const react_styles: {
  [alias in react.ReactStylingStrategy["type"]]: react.ReactStylingStrategy[];
} = {
  "styled-components": [
    {
      type: "styled-components",
      module: "@emotion/styled",
    },
    {
      type: "styled-components",
      module: "styled-components",
    },
  ],
  "inline-css": [
    {
      type: "inline-css",
    },
  ],
  "css-module": [
    {
      type: "css-module",
      importDefault: "styles",
      loader: "css-loader",
      lang: "css",
    },
    {
      type: "css-module",
      importDefault: "styles",
      loader: "css-loader",
      lang: "scss",
    },
  ],
  css: [
    {
      type: "css",
      lang: "css",
    },
    {
      type: "css",
      lang: "scss",
    },
  ],
};

export function defaultConfigByFramework(
  framework: config.FrameworkConfig["framework"]
) {
  switch (framework) {
    case "react": {
      return react_presets.react_default;
    }
    case "flutter": {
      return flutter_presets.flutter_default;
    }
    case "react-native": {
      return reactnative_presets.reactnative_default;
    }
    case "solid-js": {
      return solid_presets.solid_default;
    }
    case "vanilla": {
      return vanilla_presets.vanilla_default;
    }
    case "preview": {
      return preview_presets.default;
    }
  }
}
