const packages = [
  "@engine/core",

  // -----------------------------
  // region @designto-code
  "@grida/api",
  "@grida/code",
  "@designto/debugger",
  "@grida/builder-config",
  "@grida/builder-config-preset",
  "@grida/builder-platform-types",
  "@designto/code",
  "@designto/sanitized",
  "@designto/token",
  "@designto/flutter",
  "@designto/solid-js",
  "@designto/web",
  "@designto/vanilla",
  "@designto/react",
  "@designto/react-native",

  "@code-features/assets",
  "@code-features/module",
  "@code-features/documentation",
  "@code-features/component",
  "@code-features/flags",
  "@code-features/fonts",
  // -----------------------------
  // plugins
  "@code-plugin/core",
  "@code-plugin/text-fit",
  // -----------------------------

  // -----------------------------
  // region builders - part of designto-code / coli

  // region web builders
  "@web-builder/nodejs",
  "@web-builder/core",
  "@web-builder/module-es",
  "@web-builder/module-jsx",
  "@web-builder/solid-js",
  "@web-builder/vanilla",
  "@web-builder/react-core",
  "@web-builder/react",
  "@web-builder/react-native",
  "@web-builder/reflect-ui",
  "@web-builder/styled",
  "@web-builder/styles",
  // endregion web builders
  // -----------------------------
];

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
