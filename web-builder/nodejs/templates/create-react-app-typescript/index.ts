export const CRA_TYPESCRIPT_PACKAGE_PRESET = `
{
  "name": "react-typescript",
  "version": "0.0.0",
  "description": "Bridged React Typescript Preset",
  "keywords": [
    "typescript",
    "react",
    "Bridged"
  ],
  "main": "src/index.tsx",
  "dependencies": {
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-scripts": "4.0.0"
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
}`;
