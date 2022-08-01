/**
 * @type {import('@grida/builder-config').FrameworkConfig}
 */
const frameworkConfig = {
  framework: "react",
  language: "tsx",
  component_declaration_style: {
    exporting_style: {
      type: "export-named-functional-component",
      declaration_syntax_choice: "function",
      exporting_position: "with-declaration",
    },
  },
};

/**
 * @type {import('@grida/builder-config').DesignSourceConfig}
 */
const designSourceConfig = {
  provider: "figma",
  file: "x7RRK6RwWtZuNakmbMLTVH",
  client: "api.figma.com",
  auth: {
    personalAccessToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
  },
};

/**
 * @type {import('grida').GridaConfig}
 */
const config = {};

module.exports = {
  name: "react-example",
  designsource: designSourceConfig,
  framework: frameworkConfig,
};
