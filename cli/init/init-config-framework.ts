import path from "path";
import { BaseProjectInfo } from "../project";
import { prompt } from "enquirer";
import type { FrameworkConfig } from "@grida/builder-config";
import { Language } from "@grida/builder-platform-types";
import { ReactStylingStrategy } from "@grida/builder-config/framework-react";

type FrameworkConfigResult = FrameworkConfig & {
  packages: string[];
};

export async function prompt_framework_config(
  cwd,
  baseproj?: BaseProjectInfo | undefined,
  initialized_with_template?: boolean
): Promise<FrameworkConfigResult> {
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
            message: "css",
          },
          ...packages.map((p) => {
            return {
              message: p,
              name: p,
              hint: baseproj?.packages?.includes(p)
                ? " (found from package.json)"
                : undefined,
            };
          }),
          {
            name: "inline-style",
            message: "inline-style",
            hint: `<div style={{…}}/>`,
          },
          {
            name: "others",
          },
          // "scss",
          // "less",
        ],
      });

      // TODO: add multi styling config sypport
      let default_style: ReactStylingStrategy = {
        type: "styled-components",
        module: "@emotion/styled",
      };
      let required_packages = ["@emotion/styled", "@emotion/react"];
      if (styles.includes("@emotion/styled")) {
        default_style = {
          type: "styled-components",
          module: "@emotion/styled",
        };
        required_packages = ["@emotion/styled", "@emotion/react"];
      } else if (styles.includes("styled-components")) {
        default_style = {
          type: "styled-components",
          module: "styled-components",
        };
        required_packages = ["styled-components"];
      } else if (styles.includes("inline-css")) {
        default_style = {
          type: "inline-css",
        };
        required_packages = [];
      }

      return {
        framework: framework as "react",
        language: Language.tsx,
        // TODO:
        styling: default_style,
        component_declaration_style: {
          // TODO:
          exporting_style: {
            type: "export-named-functional-component",
            declaration_syntax_choice: "function",
            export_declaration_syntax_choice: "export",
            exporting_position: "with-declaration",
          },
        },
        packages: required_packages,
      };
    }
  }

  switch (framework) {
    case "react-native": {
      return {
        framework: framework,
        language: Language.tsx,
        // TODO:
        styling: {
          type: "styled-components",
          module: "@emotion/native",
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
        shadow: {
          type: "react-native",
          module: "react-native",
        },
        gradient_text: {
          linear: {
            module: "react-native-text-gradient",
          },
          radial: ["fallback-to-svg"],
        },
        gradient: {
          linear: {
            module: "react-native-linear-gradient",
          },
          radial: {
            module: "react-native-radial-gradient",
          },
        },
        svg: {
          module: "react-native-svg",
          prefer_mode: "svg-with-path",
        },
        packages: ["@emotion/styled", "@emotion/react"],
      };
      break;
    }
    case "flutter": {
      return { framework: "flutter", language: Language.dart, packages: [] };
    }
    default: {
      return {
        framework: framework as FrameworkConfig["framework"],
        package: [],
      } as any as FrameworkConfigResult;
    }
  }
}
