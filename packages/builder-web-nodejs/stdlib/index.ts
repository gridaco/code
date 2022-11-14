/**
 *  e.g.
 * ```
 * const TYPESCRIPT: StandardLibraryManifest = {
    id: "typescript",
    name: "typescript",
    version: "4.2.4",
    website: "https://www.typescriptlang.org",
};
 * ```
 */
export interface StandardLibraryManifest<
  ALIAS extends {
    [key: string]: { name: string };
  } = any
> {
  id: string;
  name: string;
  version: string;
  website: string;
  alias?: ALIAS;
}

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/typescript
 */
const TYPESCRIPT: StandardLibraryManifest = {
  id: "typescript",
  name: "typescript",
  version: "4.2.4",
  website: "https://www.typescriptlang.org",
};

///
/// region react (stand-alone)
///

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@types/react
 */
const T_REACT: StandardLibraryManifest = {
  id: "@types/react",
  name: "@types/react",
  version: "17.0.5",
  website: "https://reactjs.org",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@types/react-dom
 */
const T_REACT_DOM: StandardLibraryManifest = {
  id: "@types/react-dom",
  name: "@types/react-dom",
  version: "17.0.3",
  website: "https://reactjs.org",
};

/**
 * last-update: Nov 2022
 * https://www.npmjs.com/package/react
 */
const REACT: StandardLibraryManifest = {
  id: "react",
  name: "react",
  version: "18.2.0",
  website: "https://reactjs.org",
};

/**
 * last-update: Nov 2022
 * https://www.npmjs.com/package/react-dom
 */
const REACT_DOM: StandardLibraryManifest = {
  id: "react-dom",
  name: "react-dom",
  version: "18.2.0",
  website: "https://reactjs.org",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/react-scripts
 */
const REACT_SCRIPTS: StandardLibraryManifest = {
  id: "react-scripts",
  name: "react-scripts",
  version: "4.0.3",
  website: "",
};

///
/// endregion react (stand-alone)
///

///
/// region react-native
///

/**
 * last-update: Feb 2022
 * https://www.npmjs.com/package/react-native
 */
const REACT_NATIVE: StandardLibraryManifest = {
  id: "react-native",
  name: "react-native",
  version: "0.67.2",
  website: "https://reactnative.dev/",
};

///
/// endregion react-native
///

///
/// region emotion
///

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@emotion/css
 */
const EMOTION_CSS: StandardLibraryManifest = {
  id: "@emotion/css",
  name: "@emotion/css",
  version: "11.1.3",
  website: "https://emotion.sh",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@emotion/core
 */
const EMOTION_CORE: StandardLibraryManifest = {
  id: "@emotion/core",
  name: "@emotion/core",
  version: "11.0.0",
  website: "https://emotion.sh",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@emotion/react
 */
const EMOTION_REACT: StandardLibraryManifest = {
  id: "@emotion/react",
  name: "@emotion/react",
  version: "11.4.0",
  website: "https://emotion.sh",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@emotion/styled
 */
const EMOTION_STYLED: StandardLibraryManifest = {
  id: "@emotion/styled",
  name: "@emotion/styled",
  version: "11.3.0",
  website: "https://emotion.sh",
};

const EMOTION_NATIVE: StandardLibraryManifest = {
  id: "@emotion/native",
  name: "@emotion/native",
  version: "11.0.0",
  website: "https://emotion.sh/docs/@emotion/native",
};

///
/// endregion emotion
///

///
/// region styled-components (react)
///
/**
 * last-update: May 2021
 * https://www.npmjs.com/package/styled-components
 */
const STYLED_COMPONENTS: StandardLibraryManifest = {
  id: "styled-components",
  name: "styled-components",
  version: "5.3.0",
  website: "https://styled-components.com",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@types/styled-components
 */
const T_STYLED_COMPONENTS = {
  id: "@types/styled-components",
  name: "@types/styled-components",
  version: "5.1.9",
  website: "https://styled-components.com",
};
///
/// endregion styled-components (react)
///

///
/// region material-ui (react)
///

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@material-ui/core
 */
const MATERIAL_UI_CORE: StandardLibraryManifest = {
  id: "@material-ui/core",
  name: "@material-ui/core",
  version: "4.11.4",
  website: "https://material-ui.com",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@material-ui/icons
 */
const MATERIAL_UI_ICONS: StandardLibraryManifest = {
  id: "@material-ui/core",
  name: "@material-ui/core",
  version: "4.11.2",
  website: "https://material-ui.com",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/@material-ui/styles
 */
const MATERIAL_UI_STYLES: StandardLibraryManifest = {
  id: "@material-ui/styles",
  name: "@material-ui/styles",
  version: "4.11.4",
  website: "https://material-ui.com",
};

///
/// endregion material-ui (react)
///

///
/// region solidjs
///

/**
 * last-update: Jun 2022
 * https://www.npmjs.com/package/solid-js
 */
const SOLIDJS: StandardLibraryManifest<{
  web: { name: string };
  store: { name: string };
}> = {
  id: "solid-js",
  name: "solid-js",
  version: "1.4.4",
  website: "https://www.solidjs.com/",
  alias: {
    web: { name: "solid-js/web" },
    store: { name: "solid-js/store" },
  },
};

/**
 * https://www.npmjs.com/package/solid-styled-components
 */
const SOLID_STYLED_COMPONENTS: StandardLibraryManifest = {
  id: "solid-styled-components",
  name: "solid-styled-components",
  version: "0.28.3",
  website: "https://github.com/solidjs/solid-styled-components",
};

///
/// endregion solidjs
///

export const standard_libraries = {
  // ts
  typescript: TYPESCRIPT,

  // react
  react: REACT,
  types_react: T_REACT,
  react_dom: REACT_DOM,
  types_react_dom: T_REACT_DOM,
  react_scripts: REACT_SCRIPTS,

  // react-native
  react_native: REACT_NATIVE,

  // emotion
  emotion_css: EMOTION_CSS,
  emotion_core: EMOTION_CORE,
  emotion_styled: EMOTION_STYLED,
  emotion_native: EMOTION_NATIVE,
  emotion_react: EMOTION_REACT,

  // styled-components
  styled_components: STYLED_COMPONENTS,
  types_styled_components: T_STYLED_COMPONENTS,

  // material-ui (react)
  material_ui_core: MATERIAL_UI_CORE,
  material_ui_icons: MATERIAL_UI_ICONS,
  material_ui_styles: MATERIAL_UI_STYLES,

  // solidjs
  solid_js: SOLIDJS,
  solud_styled_components: SOLID_STYLED_COMPONENTS,
};
