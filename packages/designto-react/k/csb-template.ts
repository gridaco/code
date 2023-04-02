export const create_react_app_typescript_starter = {
  template: "create-react-app-typescript",
  package_json: `{
  "name": "@made-with-grida/react-typescript",
  "version": "1.0.0",
  "description": "React and TypeScript example starter project",
  "keywords": [
    "typescript",
    "react",
    "starter"
  ],
  "main": "src/index.tsx",
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "4.0.0",
    "@emotion/react": "^11.1.5",
    "@emotion/styled": "^11.1.5"
  },
  "devDependencies": {
    "@types/react": "17.0.0",
    "@types/react-dom": "17.0.0",
    "typescript": "4.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}`,

  tsconfig_json: `{
    "include": [
        "./src/**/*"
    ],
    "compilerOptions": {
        "strict": true,
        "esModuleInterop": true,
        "lib": [
            "dom",
            "es2015"
        ],
        "jsx": "react-jsx"
    }
}`,

  index_tsx: (component_name: string) => `import React from "react";
import { render } from "react-dom";

import ${component_name} from "./App";

const rootElement = document.getElementById("root");
render(<${component_name} />, rootElement);
`,

  app_tsx: (content: string) => content,
};
