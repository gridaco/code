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
import type { FrameworkConfig } from "@grida/builder-config";
import fs from "fs";
import path from "path";

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
    const target = await fetchTargetAsReflect({
      file: filekey,
      node,
      auth: auth,
    });

    MainImageRepository.instance = new RemoteImageRepositories(target.file, {
      authentication: auth,
    });
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

    const file = path.join(baseUrl, "index.tsx"); // TODO:
    fs.writeFile(file, code.scaffold.raw, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("The file was saved!", file);
      }
    });
  }
}
