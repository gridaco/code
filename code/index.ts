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
import { defaultConfigByFramework } from "@grida/builder-config-preset";
import { Language } from "@grida/builder-platform-types";
import type { TPlugin } from "@code-plugin/core";

export async function code({
  auth,
  uri,
  framework,
  plugins,
}: {
  auth:
  | {
    personalAccessToken: string;
  }
  | { accessToken: string };
  uri: string;
  framework: FrameworkConfig;
  plugins?: TPlugin[];
}) {
  //

  const res = parseFileAndNodeId(uri as string);
  if (res) {
    const { file: filekey, node } = res;

    //
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
        // fill missing configurations.
        ...defaultConfigByFramework(framework.framework),
        ...framework,
      },
      asset_config: { asset_repository: MainImageRepository.instance },
      plugins,
    });

    const src = postproc_src(
      filesrc(code, framework.framework),
      framework.language
    );

    return {
      src,
      figma: {
        filekey,
        node,
      },
      target,
    };
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
    // TODO: disabling dart formatter due to run time error.
    // ```
    // dartException: TypeErrorImplementation {
    //    message: "TypeError: Instance of 'JavaScriptFunction': type 'JavaScriptFunction' is not a subtype of type 'Function1'"
    // }
    // ```

    // import { formatCode } from "dart-style";

    // try {
    //   const { code, error } = formatCode(src);
    //   if (error) {
    //     return src;
    //   }
    //   return code;
    // } catch (e) {
    //   return src;
    // }
  }

  return src;
}
