import { designToCode, Result } from "@designto/code";
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
import { Language } from "@grida/builder-platform-types";
import { formatCode } from "dart-style";

type OutPathInput =
  | { type: "file-name"; name: string }
  | { type: "relative-to-default"; path: string }
  | { type: "absolute"; path: string }
  | ".";

export async function code(
  cwd = process.cwd(),
  {
    auth,
    uri,
    baseUrl,
    framework,
    out,
  }: {
    auth:
      | {
          personalAccessToken: string;
        }
      | { accessToken: string };
    baseUrl: string;
    uri: string;
    framework: FrameworkConfig;
    out: OutPathInput;
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
      asset_config: { asset_repository: MainImageRepository.instance },
    });
    spnr_gen.succeed();

    // TODO: - update name
    const file = make_final_path({
      defaultDir: baseUrl,
      generated_filename: code.name,
      out: out,
      language: framework.language,
    });
    const _log_relpath = "./" + path.relative(cwd, file);

    fs.writeFile(
      file,
      postproc_src(filesrc(code, framework.framework), framework.language),
      (err) => {
        if (err) {
          throw err;
        } else {
          console.log(
            `${chalk.green("✔")} Module '${code.name}' added to ${chalk.blue(
              _log_relpath
            )}`
          );
        }
      }
    );
  }
}

function filesrc(
  code: Result,
  framework: FrameworkConfig["framework"]
): string {
  switch (framework) {
    case "flutter": {
      return code.code.raw;
    }
    default:
      return code.scaffold.raw;
  }
}

function postproc_src(src: string, language: Language) {
  if (language === Language.dart) {
    const { code, error } = formatCode(src);
    if (error) {
      return src;
    }
    return code;
  }

  return src;
}

function make_final_path({
  defaultDir,
  generated_filename,
  out,
  language,
}: {
  defaultDir: string;
  generated_filename: string;
  out: OutPathInput;
  language: Language;
}) {
  if (out === ".") {
    return path.join(defaultDir, `${generated_filename}.${language}`);
  } else {
    switch (out.type) {
      case "file-name": {
        if (out.name.endsWith(`.${language}`)) {
          return path.join(defaultDir, out.name);
        }
        return path.join(defaultDir, `${out.name}.${language}`);
      }
      case "absolute": {
        // TODO:
      }
      case "relative-to-default": {
        //
      }
    }
  }
  //
}
