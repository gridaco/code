import { prompt } from "enquirer";
import { code } from "../code";
import { indexDesignSource } from "../indexing";
import { locateGridaProject } from "../project";
import { parseFileAndNodeId } from "@design-sdk/figma-url";
import type { DesignSourceConfig } from "@grida/builder-config";
import path from "path";

interface ModuleInfo {
  uri?: string;
  version?: string;
}

export async function add(cwd = process.cwd(), module: ModuleInfo) {
  const grida = locateGridaProject(cwd);
  if (!grida) {
    throw new Error("No grida project found. run `grida init` first.");
  }

  const { fallbackDir } = grida.config;

  if (!module.uri) {
    module.uri = await prompt_project_design_source_module(
      grida.config.designsource
    );
  }

  code(cwd, {
    auth: {
      personalAccessToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
    },
    baseUrl: path.join(cwd, fallbackDir),
    uri: module.uri,
    framework: grida.config.framework,
  });
}

async function prompt_project_design_source_module(
  config: DesignSourceConfig
): Promise<string> {
  // load fresh index
  const index = await indexDesignSource(
    {
      ...config,
      auth: {
        // TODO: load from central store
        personalAccessToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
      },
    },
    {
      showLoading: true,
    }
  );

  const choices = [
    ...index.components.map((c) => {
      return {
        name: c.name,
        hint: c.description || "component",
        value: "", // TODO:
      };
    }),
    ...index.frames.map((f) => {
      return {
        name: f.name,
        hint: `${f.id} (${f.parent.name})`,
        value: f.id,
      };
    }),
  ];

  const { uri } = await prompt<{ uri: string }>({
    name: "uri",
    message: "Please enter the module (uri or id): ",
    // @ts-ignore
    hint: "xxx:xxx | https://www.figma.com/file/xxx?node-id=xxx:xxx",
    type: choices.length ? "autocomplete" : "input",
    // @ts-ignore
    limit: 20,
    choices: choices,
  });

  if (uri.length >= 3 && uri.length <= 10) {
    return `https://www.figma.com/file/${config.file}/?node-id=${uri}`;
    //
  } else {
    try {
      const { file: filekey, node: nodeid } = parseFileAndNodeId(uri);
      if (filekey === config.file) {
        if (filekey && nodeid) {
          return uri;
        }
      } else {
        throw new Error(
          `Module resolution failed: this module is outside of project's design source - "${config.file}"`
        );
      }
    } catch (e) {
      throw new Error(`Module resolution failed invalid uri: ${e.message}`);
    }
  }
}

//
