// "@emotion/react": "^11.1.5",
// "@emotion/styled": "^11.1.5"

export function make_create_react_app_typescript_package_json({
  name = "src/index.tsx",
  description = "React and TypeScript example starter project",
  main,
  dependencies = {},
}: {
  name: string;
  description?: string;
  main: string;
  dependencies?: {
    [key: string]: string;
  };
}) {
  const package_json = {
    name: `@made-with-grida/${name}`,
    version: "0.0.0",
    description: description,
    keywords: ["grida", "design to code", "made with grida"],
    main: main,
    dependencies: {
      react: "18.2.0",
      "react-dom": "18.2.0",
      "react-scripts": "4.0.0",
      ...dependencies,
    },
    devDependencies: {
      "@types/react": "17.0.0",
      "@types/react-dom": "17.0.0",
      typescript: "4.1.3",
    },
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test --env=jsdom",
      eject: "react-scripts eject",
    },
    browserslist: [">0.2%", "not dead", "not ie <= 11", "not op_mini all"],
  };
  return JSON.stringify(package_json, null, 2);
}
