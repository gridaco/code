import fs from "fs";
import path from "path";
import { locateProject } from "../project";
import { prompt } from "enquirer";

import type {
  DesignSourceConfig,
  FrameworkConfig,
} from "@grida/builder-config";

export async function init() {
  const proj = locateProject();
  if (proj) {
    throw new Error(`grida.config.js already exists: ${proj.config_file}`);
  }

  const { continue_witout_existing_project } = await prompt<{
    continue_witout_existing_project: boolean;
  }>({
    name: "continue_witout_existing_project",
    type: "confirm",
    message:
      "No project root is found (package.json or pubspec.yml). Do you want to continue without creating a project?",
  });

  if (!continue_witout_existing_project) {
    console.log("Please run `init` again after creating a project.");
    throw new Error("Cancelled");
  }

  const { name } = await prompt<{ name: string }>({
    name: "name",
    message: "What is your project name?",
    initial: "my-project",
    type: "input",
  });

  const { provider } = await prompt<{
    provider: DesignSourceConfig["provider"];
  }>({
    name: "provider",
    message: "Where from to import your design?",
    type: "select",
    choices: ["figma", "sketch", "xd"],
  });

  switch (provider) {
    case "figma": {
      await prompt({
        name: "file",
        message: "Please enter your figma file url",
        type: "input",
        hint: "https://www.figma.com/file/xxxx",
      });
      break;
    }
    default: {
      throw new Error(`Sorry, ${provider} is not supported yet.`);
    }
  }

  const { framework } = await prompt<{
    framework: FrameworkConfig["framework"];
  }>({
    name: "framework",
    type: "select",
    message: "Select framework",
    choices: <Array<FrameworkConfig["framework"]>>[
      "flutter",
      "react",
      "react-native",
      "vue",
      "vanilla",
      "solid-js",
    ],
  });

  switch (framework) {
    case "react": {
      await prompt({
        name: "style",
        message: "Select style (press space to select, enter to confirm)",

        type: "multiselect",
        choices: [
          {
            name: "css",
            value: "css",
          },
          {
            name: "styled-components",
            value: "styled-components",
          },
          {
            name: "@emotion/styled",
            value: "@emotion/styled",
          },
          {
            name: "inline-style (`<div style={{…}}/>`)",
            value: "inline-style",
          },
          {
            name: "others",
          },
          // "scss",
          // "less",
        ],
      });
    }
  }

  // create grida.config.js file
  // create_grida_config_js();
}

function create_grida_config_js(cwd = process.cwd()) {
  const grida_config_js = path.join(cwd, "grida.config.js");
  if (fs.existsSync(grida_config_js)) {
    throw new Error(`grida.config.js already exists in ${cwd}`);
  }
  fs.writeFileSync(grida_config_js, `module.exports = {};`);
}
