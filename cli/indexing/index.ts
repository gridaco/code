import type { DesignSourceConfig } from "@grida/builder-config";
import { Client, Canvas } from "@design-sdk/figma-remote-api";
const ora = require("ora");

export async function indexDesignSource(
  designsource: DesignSourceConfig,
  { showLoading: showLoading = true }
) {
  const spinner = ora("Indexing design source..");
  if (showLoading) {
    spinner.start();
  }

  const client = Client({
    ...designsource.auth,
  });

  try {
    const { data } = await client.file(designsource.file, {
      depth: 2,
    });

    if (showLoading) {
      spinner.succeed();
    }

    const { version, name, document, components, lastModified } = data;
    const root_frames = (document.children as Canvas[])
      .map((c) => {
        return c.children
          .map((child) => {
            return {
              ...child,
              parent: {
                id: c.id,
                name: c.name,
              },
            };
          })
          .filter((c) => c.type === "FRAME");
      })
      .flat();

    const root_components = Object.keys(components).map(
      (key) => components[key]
    );

    return {
      name: name,
      version: version,
      lastModified,
      frames: root_frames,
      components: root_components,
    };
  } catch (e) {
    if (showLoading) {
      spinner.fail();
    }
    throw e;
  }
}
