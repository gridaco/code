import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { defaultConfigByFramework } from "@grida/builder-config-preset";
import {
  init,
  prompt_figma_personal_access_token,
  prompt_framework_config,
} from "./init";
import { add } from "./add";
import { code } from "./code";
import { Framework } from "@grida/builder-platform-types";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { checkForUpdate } from "./update";
import { login, logout } from "./auth";
import { startFlutterDaemonServer } from "./flutter/daemon";
import { parseFileId } from "@design-sdk/figma-url";
import chalk from "chalk";

function loadenv(argv) {
  const { cwd } = argv;
  // Load .env file
  const dotenvpath = path.join(cwd, ".env");
  if (fs.existsSync(dotenvpath)) {
    dotenv.config({ path: dotenvpath });
    console.info(chalk.dim("Loaded .env file"));
  }
}

export default async function cli() {
  await checkForUpdate();

  yargs(hideBin(process.argv))
    .option("cwd", {
      type: "string",
      default: process.cwd(),
      requiresArg: false,
    })
    .option("dry-run", {
      type: "boolean",
      default: false,
      requiresArg: false,
    })
    .global(["cwd", "dry-run"])
    .command(
      "init",
      "init grida project",
      () => {},
      ({ cwd }) => {
        init(cwd);
      }
    )
    .command(
      "add [uri...]",
      "add grida module",
      () => {},
      async ({ cwd, uri, out }) => {
        add(
          cwd,
          { uri: uri as string[], version: "latest" },
          {
            out: _map_out(out as string),
          }
        );
      },
      [loadenv]
    )
    .command(
      "login",
      "login to grida services",
      () => {},
      async () => {
        login();
      },
      []
    )
    .command(
      "logout",
      "logout to grida services",
      () => {},
      async () => {
        logout();
      },
      []
    )
    .command(
      "code [framework] <uri>",
      "generate code from input uri",
      (argv) => {
        // return;
      },
      async ({ cwd, framework, uri, out, ...argv }) => {
        //

        const filekey = parseFileId(uri as string);

        // promp if not set
        const _personal_access_token: string =
          (argv["figma-personal-access-token"] as string) ??
          (await prompt_figma_personal_access_token(filekey));

        // make this path absolute if relative path is given.
        const _outpath_abs: string = path.isAbsolute(out as string)
          ? (out as string)
          : path.resolve(cwd, out as string);

        const config_framework = framework
          ? defaultConfigByFramework(framework as Framework)
          : await prompt_framework_config(cwd, undefined, false);

        if (!config_framework) {
          throw new Error(`Unknown framework:  "${framework}"`);
        }

        code(cwd, {
          framework: config_framework,
          uri: uri as string,
          auth: {
            personalAccessToken: _personal_access_token,
          },
          baseUrl: _outpath_abs,
          out: _map_out(out as string) as any,
        });
      },
      [loadenv]
    )
    .command(
      "flutter daemon",
      "Starts local flutter daemon server for grida services",
      () => {},
      () => {
        startFlutterDaemonServer();
      }
    )
    .option("port", {
      requiresArg: false,
    })
    .option("figma-personal-access-token", {
      description: "figma personal access token",
      alias: ["fpat", "figma-pat"],
      type: "string",
      default: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
      requiresArg: false,
    })
    .option("out", {
      alias: ["o", "output"],
      type: "string",
      default: ".",
      requiresArg: true,
    })
    .demandCommand(0)
    .parse();
}

function _map_out(out: string) {
  if (path.isAbsolute(out)) {
    return {
      type: "absolute",
      path: out,
    };
  }
  if (out === ".") {
    return out;
  } else {
    return {
      type: "file-name",
      name: out,
    };
  }
}
