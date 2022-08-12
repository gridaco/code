import fs from "fs";
import path from "path";
import {
  locateGridaProject,
  locateBaseProject,
  BaseProjectInfo,
} from "../project";
import { prompt } from "enquirer";
import type { FrameworkConfig } from "@grida/builder-config";
import { Framework, Language } from "@grida/builder-platform-types";
import { addDotEnv } from "./init-.env";
import chalk from "chalk";
import { exit } from "process";
import { prompt_designsource_config } from "./init-config-designsource";
import { init_base_project_with_template } from "./init-base-project-with-teplate";
import { create_grida_config_js } from "./init-grida.config.js";
import { init_dotgrida } from "./init-.grida";
import { init_gitignore } from "./init-.gitignore";

export async function init(
  cwd = process.cwd(),
  initials?: { name?: string; initialized_with_template?: boolean }
) {
  const baseproj = locateBaseProject(cwd);
  const proj = locateGridaProject(cwd);
  if (proj) {
    throw new Error(`grida.config.js already exists: ${proj.config_file}`);
  }

  if (!baseproj) {
    const { continue_with_new_project_using_template } = await prompt<{
      continue_with_new_project_using_template: boolean;
    }>({
      name: "continue_with_new_project_using_template",
      initial: true,
      type: "confirm",
      message:
        "No project is found (package.json or pubspec.yml) with framework configuration. Do you want to create new project with template?",
    });
    if (continue_with_new_project_using_template) {
      const _ = await init_base_project_with_template(cwd, {
        create_cwd_if_not_exists,
      });
      if (_ == "exit") {
        console.log(
          "Cancelled. You can run `grida init` again after creating a project."
        );
        exit(0);
      } else {
        const { created, cwd: newcwd, name } = _;
        if (created)
          return init(newcwd, { name, initialized_with_template: true });
      }
      return;
    }
  }

  let name: string = initials?.name ?? "untitled";
  if (!initials?.name) {
    // the name can be passed via previous init operation, -- create base project with template
    const { name: _name } = await prompt<{ name: string }>({
      name: "name",
      message: "What is your project named?",
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

  // inits grida.config.js file if requirements not met.
  init_gitignore(cwd, {
    template: framework_gitignore_templates[config_framework.framework],
  }); // init .gitignore first (why? cause we're dealing with user's local directory here. we don't want to mass things up. .gitignore first.)
  // creates grida.config.js
  create_grida_config_js(cwd, {
    name: name,
    type: "project",
    // TODO: better approach to manage schema version?
    $schema: "node_modules/@grida/grida-config-schema/v1.json",
    designsource: {
      ...config_designsource,
      // this should not be written to grida.config.js - it's written to .env
      auth: undefined,
    },
    fallbackDir: fallbackdir,
    framework: config_framework,
  });
  // inits .grida directory if requierd
  init_dotgrida(cwd);
}

const framework_gitignore_templates = {
  pub: "dart",
  node: "node",
  flutter: "dart",
  react: "node",
  svelte: "node",
  "react-native": "react-native",
} as const;

async function prompt_framework_config(
  cwd,
  baseproj?: BaseProjectInfo | undefined,
  initialized_with_template?: boolean
): Promise<FrameworkConfig> {
  let framework: BaseProjectInfo["framework"] = baseproj?.framework;
  if (!initialized_with_template) {
    if (framework && framework !== "unknown") {
      const _rel_path_to_config_file = path.relative(cwd, baseproj.config_file);
      console.log(
        `${framework} configuration found in ${_rel_path_to_config_file}`
      );
    } else {
      let choices: Array<FrameworkConfig["framework"]> = [
        "flutter",
        "react",
        "react-native",
        "vanilla",
        "solid-js",
        // "vue",
      ];

      if (baseproj?.framework == "unknown") {
        choices = choices.filter((f) =>
          baseproj.allowed_frameworks.includes(f)
        );
      }

      const { framework: _framework } = await prompt<{
        framework: FrameworkConfig["framework"];
      }>({
        name: "framework",
        type: "select",
        message: "Select framework",
        // initial: baseproj?.framework,
        choices: choices,
      });
      framework = _framework;
    }
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

export * from "./init-.env";
export * from "./init-.gitignore";
export * from "./init-.grida";
export * from "./init-base-project-with-teplate";
export * from "./init-config-designsource";
export * from "./init-config-designsource-figma";
export * from "./init-grida.config.js";
export * from "./init-package.json";
export * from "./init-pubspec.yaml";
