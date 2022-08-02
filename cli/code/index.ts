import { designToCode } from "@designto/code";
import { DesignInput } from "@grida/builder-config/input";
import { parseFileAndNodeId } from "@design-sdk/figma-url";
import { fetchTargetAsReflect } from "@design-sdk/figma-remote";
import {
  ImageRepository,
  MainImageRepository,
} from "@design-sdk/asset-repository";
import { RemoteImageRepositories } from "@design-sdk/figma-remote/asset-repository";
import type { FrameworkConfig } from "@grida/builder-config";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { log } from "../logger";
import ora from "ora";
import { defaultConfigByFramework } from "@grida/builder-config-preset";

export async function code(
  cwd = process.cwd(),
  {
    auth,
    uri,
    baseUrl,
    framework,
  }: {
    auth:
      | {
          personalAccessToken: string;
        }
      | { accessToken: string };
    baseUrl: string;
    uri: string;
    framework: FrameworkConfig;
  }
) {
  //

  const res = parseFileAndNodeId(uri as string);
  if (res) {
    const { file: filekey, node } = res;
    log(`filekey: ${filekey}`, `node: ${node}`);

    //
    const spnr_fetching = ora("Fetching design...");
    spnr_fetching.start();
    const target = await fetchTargetAsReflect({
      file: filekey,
      node,
      auth: auth,
    });
    spnr_fetching.succeed();

    MainImageRepository.instance = new RemoteImageRepositories(target.file, {
      authentication: auth,
    });
    MainImageRepository.instance.register(
      new ImageRepository(
        "fill-later-assets",
        "grida://assets-reservation/images/"
      )
    );

    const spnr_gen = ora("Generating code...");
    spnr_gen.start();
    const code = await designToCode({
      input: DesignInput.fromApiResponse({
        raw: target.raw,
        entry: target.reflect!,
      }),
      framework: {
        // fill missing configurations.
        ...defaultConfigByFramework(framework.framework),
        ...framework,
      },
      asset_config: { skip_asset_replacement: true },
    });
    spnr_gen.succeed();

    // TODO: - update name
    const file = path.join(baseUrl, `${code.name}.${framework.language}`);
    const relpath = "./" + path.relative(cwd, file);
    fs.writeFile(file, code.scaffold.raw, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(
          `${chalk.green("✔")} Module '${code.name}' added to ${chalk.blue(
            relpath
          )}`
        );
      }
    });
  }
}
