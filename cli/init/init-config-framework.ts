import path from "path";
import { BaseProjectInfo } from "../project";
import { prompt } from "enquirer";
import type { FrameworkConfig } from "@grida/builder-config";
import { Framework, Language } from "@grida/builder-platform-types";

export async function prompt_framework_config(
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
