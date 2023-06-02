import { designToCode } from "@designto/code";
import { Language } from "@grida/builder-platform-types";
import type { ReflectSceneNode } from "@design-sdk/figma-node";
import type { CustomAssetResolver } from "@designto/code/universal/design-to-code";
import { MainImageRepository } from "@design-sdk/asset-repository";
interface LocalNodeInput {
  id: string;
  name: string;
  entry: ReflectSceneNode;
}

export async function htmlcss(
  input: LocalNodeInput,
  resolver?: CustomAssetResolver
) {
  const { scaffold } = await designToCode({
    input: input,
    framework: {
      framework: "preview",
      imgage_alt: {
        no_alt: true,
      },
      language: Language.html,
    },
    build_config: {
      disable_detection: true,
      disable_components: true,
      disable_flags_support: false,
    },
    asset_config: {
      asset_repository: MainImageRepository.instance,
      resolver,
    },
  });

  return scaffold.raw;
}
