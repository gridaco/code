import fs from "fs";
import path from "path";
import { locateGridaProject, locateBaseProject } from "../project";
import { prompt } from "enquirer";
import type { GridaConfig } from "../config";
import type { FrameworkConfig } from "@grida/builder-config";
import JSON5 from "json5";
import { Language } from "@grida/builder-platform-types";
import { prompt_designsource_config } from "./init-config-designsource";
import { addDotEnv } from "./init-.env";
import chalk from "chalk";
import { init_base_project_with_template } from "./init-base-project-with-teplate";
import { exit } from "process";

export async function init(cwd = process.cwd(), initials?: { name?: string }) {
  const baseproj = locateBaseProject(cwd);
  const proj = locateGridaProject(cwd);
  if (proj) {
    throw new Error(`grida.config.js already exists: ${proj.config_file}`);
  }

  if (!baseproj) {
    const { continue_witout_existing_project } = await prompt<{
      continue_witout_existing_project: boolean;
    }>({
      name: "continue_witout_existing_project",
      type: "confirm",
      message:
        "No project root is found (package.json or pubspec.yml) with framework configuration. Do you want to continue without creating a project?",
    });
    if (!continue_witout_existing_project) {
      const _ = await init_base_project_with_template(cwd, {
        create_cwd_if_not_exists,
      });
      if (_ == "exit") {
        exit(0);
      } else {
        const { created, cwd: newcwd, name } = _;
        if (created) return init(newcwd, { name });
      }
      return;
    }
  }

  let name: string = "untitled";
  if (!initials?.name) {
    // the name can be passed via previous init operation, -- create base project with template
    const { name: _name } = await prompt<{ name: string }>({
      name: "name",
      message: "What is your project name?",
      initial: baseproj?.name ?? "my-project",
      type: "input",
    });
    name = _name;
  }

  const config_designsource = await prompt_designsource_config();
  const config_framework = await prompt_framework_config(cwd, baseproj);
  // create project dir if not exists - this can happen when user specified cwd with `--cwd` flag.
  create_cwd_if_not_exists(cwd);
  // init fallback dir
  const { name: fallbackdir } = create_grida_fallback_dir(cwd, {
    framework: config_framework.framework,
  });

  // create & seed .env if required.
  if (
    config_designsource.auth &&
    "personalAccessToken" in config_designsource.auth
  ) {
    const { filecreated } = addDotEnv(
      cwd,
      "FIGMA_PERSONAL_ACCESS_TOKEN",
      config_designsource.auth?.personalAccessToken
    );
    if (filecreated) {
      // TODO: add .env to .gitignore
    }

    if (filecreated) {
      console.log(chalk.dim(".env file created by grida CLI"));
    }
  }

  // create grida.config.js file
  create_grida_config_js(cwd, {
    name: name,
    type: "project",
    designsource: {
      ...config_designsource,
      // this should not be written to grida.config.js - it's written to .env
      auth: undefined,
    },
    fallbackDir: fallbackdir,
    framework: config_framework,
  });
}

async function prompt_framework_config(
  cwd,
  baseproj
): Promise<FrameworkConfig> {
  let framework: FrameworkConfig["framework"] = baseproj?.framework;
  if (framework) {
    const _rel_path_to_config_file = path.relative(cwd, baseproj.config_file);
    console.log(
      `${framework} configuration found in ${_rel_path_to_config_file}`
    );
  } else {
    const { framework: _framework } = await prompt<{
      framework: FrameworkConfig["framework"];
    }>({
      name: "framework",
      type: "select",
      message: "Select framework",
      // initial: baseproj?.framework,
      choices: <Array<FrameworkConfig["framework"]>>[
        "flutter",
        "react",
        "react-native",
        "vue",
        "vanilla",
        "solid-js",
      ],
    });
    framework = _framework;
  }

  const _selection_ux_guide_msg = "(press space to select, enter to confirm)";
  switch (framework) {
    case "react": {
      const packages = ["styled-components", "@emotion/styled"];
      // TODO:
      const { styles } = await prompt<{ styles: string[] }>({
        name: "styles",
        message: "Select style " + _selection_ux_guide_msg,
        type: "multiselect",
        initial: baseproj?.packages ?? [],
        // @ts-ignore
        choices: [
          {
            name: "css",
            value: "css",
          },
          ...packages.map((p) => {
            return {
              name: p,
              value: p,
              hint: baseproj?.packages?.includes(p)
                ? " (found from package.json)"
                : undefined,
            };
          }),
          {
            name: "inline-style",
            value: "inline-style",
            hint: `<div style={{…}}/>`,
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

  switch (framework) {
    case "react-native":
    case "react": {
      return {
        framework: framework as "react",
        language: Language.tsx,
        // TODO:
        styling: {
          type: "styled-components",
          module: "@emotion/styled",
        },
        component_declaration_style: {
          // TODO:
          exporting_style: {
            type: "export-named-functional-component",
            declaration_syntax_choice: "function",
            export_declaration_syntax_choice: "export",
            exporting_position: "with-declaration",
          },
        },
      };
    }
    case "flutter": {
      return { framework: "flutter", language: Language.dart };
    }
    default: {
      return {
        framework: framework as FrameworkConfig["framework"],
      } as FrameworkConfig;
    }
  }
}

function create_cwd_if_not_exists(cwd = process.cwd()) {
  if (!fs.existsSync(cwd)) {
    fs.mkdirSync(cwd);
  }
}

function create_grida_fallback_dir(
  cwd = process.cwd(),
  {
    framework,
  }: {
    framework: FrameworkConfig["framework"];
  }
) {
  const getdir = (framework: FrameworkConfig["framework"]) => {
    switch (framework) {
      case "flutter":
        return "./lib/grida";
      case "react":
      case "react-native":
      case "solid-js":
        return "./grida";
      case "vanilla":
      case "preview":
      default:
        return ".";
    }
  };

  const dirname = getdir(framework);
  const dir = path.resolve(cwd, dirname);

  if (fs.existsSync(dir)) {
    throw new Error(`Grida fallback dir:${dirname} already exists`);
  }
  fs.mkdirSync(dir);
  // add .gitkeep
  fs.writeFileSync(
    path.resolve(dir, ".gitkeep"),
    "This directory is reserved for Grida. you may remove this .gitkeep file once the directory is fullfilled."
  );

  return {
    name: dirname,
    path: dir,
  };
}

function create_grida_config_js(cwd = process.cwd(), config: GridaConfig) {
  const grida_config_js = path.join(cwd, "grida.config.js");
  if (fs.existsSync(grida_config_js)) {
    throw new Error(`grida.config.js already exists in ${cwd}`);
  }
  const configjson = JSON5.stringify(config, null, 2);
  const src = `// This file is auto-generated by Grida.

/**
 * @type {import('grida').GridaConfig}
 */
const config = ${configjson};

module.exports = config;`;
  fs.writeFileSync(grida_config_js, src);
}
