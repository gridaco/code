import { designToCode } from "@designto/code";
import { Language } from "@grida/builder-platform-types";
import type { ReflectSceneNode } from "@design-sdk/figma-node";

interface LocalNodeInput {
  id: string;
  name: string;
  entry: ReflectSceneNode;
}

export async function htmlcss(input: LocalNodeInput) {
  const { scaffold } = await designToCode({
    input: input,
    framework: {
      framework: "preview",
      imgage_alt: {
        no_alt: true,
      },
      language: Language.html,
    },
    asset_config: {
      //
    },
  });

  return scaffold.raw;
}
