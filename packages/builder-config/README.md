# `@grida/builder-config`

This package is automatically installed via `grida`

```bash
yarn add @grida/builder-config
```

## Usage in grida.config.js

```js
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
 * @type {import('@grida/builder-config').FrameworkConfig}
 */
const designSource = {
    provider: "figma",
    url: "https://www.figma.com/file/xxx",
}

module.exports = {
  name: "example",
  designsource: ,
  generator: frameworkConfig,
};
```

## Internal Usage
