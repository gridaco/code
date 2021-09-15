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
export interface StandardLibraryManifest {
  id: string;
  name: string;
  version: string;
  website: string;
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
 * last-update: May 2021
 * https://www.npmjs.com/package/react
 */
const REACT: StandardLibraryManifest = {
  id: "react",
  name: "react",
  version: "17.0.2",
  website: "https://reactjs.org",
};

/**
 * last-update: May 2021
 * https://www.npmjs.com/package/react-dom
 */
const REACT_DOM: StandardLibraryManifest = {
  id: "react-dom",
  name: "react-dom",
  version: "17.0.2",
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

export const standard_libraries = {
  // ts
  typescript: TYPESCRIPT,

  // react
  react: REACT,
  types_react: T_REACT,
  react_dom: REACT_DOM,
  types_react_dom: T_REACT_DOM,
  react_scripts: REACT_SCRIPTS,

  // emotion
  emotion_css: EMOTION_CSS,
  emotion_core: EMOTION_CORE,
  emotion_styled: EMOTION_STYLED,
  emotion_react: EMOTION_REACT,

  // styled-components
  styled_components: STYLED_COMPONENTS,
  types_styled_components: T_STYLED_COMPONENTS,

  // material-ui (react)
  material_ui_core: MATERIAL_UI_CORE,
  material_ui_icons: MATERIAL_UI_ICONS,
  material_ui_styles: MATERIAL_UI_STYLES,
};
