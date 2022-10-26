import { prompt } from "enquirer";
import { parseFileId } from "@design-sdk/figma-url";
import type {
  DesignSourceConfig,
  FrameworkConfig,
} from "@grida/builder-config";
import {
  Client as FigmaApiClient,
  User as FigmaUser,
} from "@design-sdk/figma-remote-api";
import chalk from "chalk";

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

async function prompt_figma_filekey() {
  const { url } = await prompt<{ url: string }>({
    name: "url",
    message: "Please enter your figma file url",
    type: "input",
    hint: "https://www.figma.com/file/xxxx",
    required: true,
    validate(value) {
      if (!value) {
        return "Please enter your figma file url. (copy & paste the link on the browser)";
      }
      try {
        const filekey = parseFileId(value);
        if (!filekey) {
          return false;
        }
        return true;
      } catch (e) {
        return e.message;
      }
    },
  });

  const filekey = parseFileId(url);
  return filekey;
}

async function prompt_figma_personal_access_token(
  filekey: string
): Promise<string> {
  const _ = await prompt({
    name: "figma-personal-access-token",
    message: "Please enter your figma personal access token.",
    type: "password",
    // @ts-ignore
    async validate(value) {
      // it's usually 43 chars long e.g "xxxxxx-xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx"
      if (!value || value.length < 40 || value.trim().includes(" ")) {
        return "Please enter your figma personal access token. How to 👉 https://grida.co/docs/with-figma/guides/how-to-get-personal-access-token";
      }

      const validationClient = FigmaApiClient({
        personalAccessToken: value,
      });

      let me: FigmaUser;
      try {
        me = (await validationClient.me()).data;
      } catch (e) {
        return "Invalid personal access token. Please try again.";
      }

      try {
        await validationClient.file(filekey, {
          depth: 1,
        });
      } catch (e) {
        return `This token for user ${chalk.blue(
          me.handle
        )} has no access to file - ${chalk.blue(
          `https://www.figma.com/file/${filekey}`
        )} Make sure you are editor of the file.`;
      }

      return true as boolean;
    },
  });

  return _["figma-personal-access-token"];
}
