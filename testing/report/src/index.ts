import path from "path";
import fs from "fs/promises";
import assert from "assert";
import ora from "ora";
import { mapper } from "@design-sdk/figma-remote";
import { convert } from "@design-sdk/figma-node-conversion";
import { Client } from "@figma-api/community/fs";
import type { Frame } from "@design-sdk/figma-remote-types";
import { htmlcss } from "@codetest/codegen";
import { Worker as ScreenshotWorker } from "@codetest/screenshot";
import { resemble } from "@codetest/diffview";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import {
  ImageRepository,
  MainImageRepository,
} from "@design-sdk/asset-repository";
import { RemoteImageRepositories } from "@design-sdk/figma-remote/asset-repository";

setupCache(axios);

const exists = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdir = async (path: string) =>
  !(await exists(path)) && (await fs.mkdir(path));

interface ReportConfig {
  sample: string;
  outDir?: string;
  localarchive?: {
    files: string;
    images: string;
  };
  skipIfReportExists?: boolean;
}

// disable logging
console.log = () => {};
console.warn = () => {};
console.error = () => {};

async function report() {
  console.info("Starting report");
  const cwd = process.cwd();
  // read the config
  const config: ReportConfig = require(path.join(cwd, "report.config.js"));

  // load the sample file
  const samples_path = (await exists(config.sample))
    ? config.sample
    : path.join(cwd, config.sample);

  assert(
    await exists(samples_path),
    `sample file not found at ${config.sample} nor ${samples_path}`
  );

  const samples = JSON.parse(await fs.readFile(samples_path, "utf-8"));

  // create .coverage folder
  const coverage_path = config.outDir ?? path.join(cwd, ".coverage");

  console.info(`Loaded ${samples.length} samples`);
  console.info(`Configuration used - ${JSON.stringify(config, null, 2)}`);

  await mkdir(coverage_path);

  const client = Client({
    paths: {
      files: config.localarchive.files,
      images: config.localarchive.images,
    },
  });

  const ssworker = new ScreenshotWorker({});
  await ssworker.launch();

  let i = 0;
  for (const c of samples) {
    i++;

    const { id: filekey } = c;
    let file;
    let exports: { [key: string]: string };
    try {
      const { data } = await client.file(filekey);
      file = data;
      if (!file) {
        continue;
      }
    } catch (e) {
      // file not found
      continue;
    }

    // create .coverage/:id folder
    const coverage_set_path = path.join(coverage_path, c.id);
    await mkdir(coverage_set_path);

    const frames: ReadonlyArray<Frame> = file.document.children
      .filter((c) => c.type === "CANVAS")
      .map((c) => c["children"])
      .flat()
      .filter((c) => c.type === "FRAME");

    try {
      exports = (
        await client.fileImages(filekey, {
          ids: frames.map((f) => f.id),
        })
      ).data.images;
    } catch (e) {
      console.error("exports not ready for", filekey, e.message);
      continue;
    }

    let ii = 0;
    for (const frame of frames) {
      ii++;

      const spinner = ora(
        `[${i}/${samples.length}] Running coverage for ${c.id}/${frame.id} (${ii}/${frames.length})`
      ).start();

      // create .coverage/:id/:node folder
      const coverage_node_path = path.join(coverage_set_path, frame.id);
      await mkdir(coverage_node_path);

      // report.json
      const report_file = path.join(coverage_node_path, "report.json");
      if (config.skipIfReportExists) {
        if (await exists(report_file)) {
          spinner.succeed(`Skipping - report for ${frame.id} already exists`);
          continue;
        }
      }

      const _mapped = mapper.mapFigmaRemoteToFigma(frame);
      const _converted = convert.intoReflectNode(
        _mapped,
        null,
        "rest",
        filekey
      );

      const width = frame.size.x;
      const height = frame.size.y;

      // TODO:
      MainImageRepository.instance = new RemoteImageRepositories(filekey, {});
      MainImageRepository.instance.register(
        new ImageRepository(
          "fill-later-assets",
          "grida://assets-reservation/images/"
        )
      );

      try {
        // image A (original)
        const exported = exports[frame.id];
        const image_a_rel = "./a.png";
        const image_a = path.join(coverage_node_path, image_a_rel);
        // download the exported image with url
        // if the exported is local fs path, then use copy instead
        if (await exists(exported)) {
          try {
            // Check if image_a exists and remove
            try {
              await fs.lstat(image_a); // use stat to check if file exists (even broken one)
              await fs.unlink(image_a);
            } catch (e) {
              // Handle file not found error
              if (e.code !== "ENOENT") {
                throw e;
              }
            }

            await fs.symlink(exported, image_a);
          } catch (e) {
            // TODO: symlink still fails with "EEXIST: file already exists, symlink"
            // we need to handle this.
            // reason? - unknown
          }
        } else if (exported.startsWith("http")) {
          const dl = await axios.get(exported, { responseType: "arraybuffer" });
          await fs.writeFile(image_a, dl.data);
        } else {
          throw new Error(`File not found - ${exported}`);
        }

        if (!(await exists(image_a))) {
          spinner.fail(`Image A not found - ${image_a} from (${exported})`);
          continue;
        }

        // codegen
        const code = await htmlcss(
          {
            id: frame.id,
            name: frame.name,
            entry: _converted,
          },
          async ({ keys }) => {
            const { data } = await client.fileImages(filekey, {
              ids: keys,
            });
            return data.images;
          }
        );

        // write index.html
        const html_file = path.join(coverage_node_path, "index.html");
        await fs.writeFile(html_file, code);

        const screenshot_buffer = await ssworker.screenshot({
          htmlcss: code,
          viewport: {
            width: Math.round(width),
            height: Math.round(height),
          },
        });

        const image_b_rel = "./b.png";
        const image_b = path.join(coverage_node_path, image_b_rel);
        await fs.writeFile(image_b, screenshot_buffer);

        const diff = await resemble(image_a, image_b);
        const diff_file = path.join(coverage_node_path, "diff.png");
        // write diff.png
        await fs.writeFile(diff_file, diff.getBuffer(false));
        // const { diff, score } = await ssim(
        //   image_a,
        //   image_b,
        //   coverage_node_path
        // );

        const report = {
          community_id: filekey,
          filekey: "unknown",
          type: "FRAME",
          name: frame.name,
          id: frame.id,
          width,
          height,
          image_a: image_a_rel,
          image_b: image_b_rel,
          reported_at: new Date().toISOString(),
          diff: {
            hitmap: diff_file,
            percent: diff.rawMisMatchPercentage,
          },
          engine: {
            name: "@codetest/codegen",
            version: "2023.1.1",
            framework: "preview",
          },
        };

        // wrie report.json
        await fs.writeFile(report_file, JSON.stringify(report, null, 2));

        spinner.text = `report file for ${frame.id} ➡ ${report_file}`;
        spinner.succeed();
      } catch (e) {
        // could be codegen error
        spinner.fail(`error on ${frame.id} : ${e.message}`);
      }
    }

    // cleaup
    // if the coverage is empty, remove the folder
    const files = await fs.readdir(coverage_set_path);
    if (files.length === 0) {
      await fs.rmdir(coverage_set_path);
    }
  }

  // cleaup
  await ssworker.terminate();
}

report();
