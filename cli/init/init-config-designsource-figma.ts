import { prompt } from "enquirer";
import { parseFileId } from "@design-sdk/figma-url";
import {
  Client as FigmaApiClient,
  User as FigmaUser,
} from "@design-sdk/figma-remote-api";
import chalk from "chalk";

export async function prompt_figma_filekey() {
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

export async function prompt_figma_personal_access_token(
  filekey: string
): Promise<string> {
  const _ = await prompt({
    name: "figma-personal-access-token",
    message:
      "Please enter your figma personal access token. (🤔 https://bit.ly/figma-personal-access-token)",
    type: "password",
    // @ts-ignore
    async validate(value) {
      // it's usually 43 chars long e.g "xxxxxx-xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx"
      if (!value || value.length < 40 || value.trim().includes(" ")) {
        return "Please enter your figma personal access token. How to 👉 https://bit.ly/figma-personal-access-token";
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