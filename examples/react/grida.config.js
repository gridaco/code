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

module.exports = {
  name: "react-example",
  designsource: {
    provider: "figma",
    url: "https://www.figma.com/file/xxx",
  },
  generator: frameworkConfig,
};
