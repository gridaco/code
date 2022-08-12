import { prompt } from "enquirer";
import type { DesignSourceConfig } from "@grida/builder-config";
import {
  prompt_figma_filekey,
  prompt_figma_personal_access_token,
} from "./init-config-designsource-figma";

export async function prompt_designsource_config(): Promise<DesignSourceConfig> {
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
      const filekey = await prompt_figma_filekey();
      const fpat = await prompt_figma_personal_access_token(filekey);
      return {
        provider: provider as "figma",
        file: filekey,
        client: "api.figma.com",
        auth: {
          personalAccessToken: fpat,
        },
      };
    }
    default: {
      throw new Error(`Sorry, ${provider} is not supported yet.`);
    }
  }
}
