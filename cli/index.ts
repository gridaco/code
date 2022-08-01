import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { designToCode } from "@designto/code";
import { DesignInput } from "@grida/builder-config/input";
import { Language } from "@grida/builder-platform-types";
import { parseFileAndNodeId } from "@design-sdk/figma-url";
import { fetchTargetAsReflect } from "@design-sdk/figma-remote";

import {
  ImageRepository,
  MainImageRepository,
} from "@design-sdk/asset-repository";
import { RemoteImageRepositories } from "@design-sdk/figma-remote/asset-repository";

import fs from "fs";
import path from "path";
import { init } from "./init";
yargs(hideBin(process.argv))
  .command(
    "init",
    "init grida project",
    () => {},
    () => {
      init();
    }
  )
  .command(
    "react <uri>",
    "input design url to react code",
    () => {},
    async (argv) => {
      const _personal_access_token = argv["personal-access-token"] as string;

      // make this path absolute if relative path is given.
      const _outpath = argv["out"] as string;
      const _outpath_abs = path.isAbsolute(_outpath)
        ? _outpath
        : path.resolve(process.cwd(), _outpath);

      const res = parseFileAndNodeId(argv.uri as string);
      if (res) {
        const { file, node } = res;
        const target = await fetchTargetAsReflect({
          file,
          node,
          auth: {
            personalAccessToken: _personal_access_token,
          },
        });

        MainImageRepository.instance = new RemoteImageRepositories(
          target.file,
          {
            authentication: {
              personalAccessToken: _personal_access_token,
            },
          }
        );
        MainImageRepository.instance.register(
          new ImageRepository(
            "fill-later-assets",
            "grida://assets-reservation/images/"
          )
        );

        const code = await designToCode({
          input: DesignInput.fromApiResponse({
            raw: target.raw,
            entry: target.reflect!,
          }),
          framework: {
            framework: "react",
            language: Language.tsx,
            styling: {
              type: "styled-components",
              module: "@emotion/styled",
            },
            component_declaration_style: {
              exporting_style: {
                type: "export-default-anonymous-functional-component",
                exporting_position: "with-declaration",
                declaration_syntax_choice: "inlinefunction",
                export_declaration_syntax_choice: "export-default",
              },
            },
          },
          asset_config: { skip_asset_replacement: true },
        });

        fs.writeFile(_outpath_abs, code.scaffold.raw, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("The file was saved!", _outpath_abs);
          }
        });
      }
    }
  )
  .option("personal-access-token", {
    description: "figma personal access token",
    type: "string",
    requiresArg: true,
  })
  .option("out", {
    alias: ["o", "output"],
    type: "string",
    requiresArg: true,
  })
  .command(
    "flutter <uri>",
    "",
    () => {},
    () => {}
  )
  .demandCommand(0)
  .parse();
