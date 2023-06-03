import path from "path";
import fs from "fs/promises";
import { existsSync as exists } from "fs";
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

const mkdir = (path: string) => !exists(path) && fs.mkdir(path);

interface ReportConfig {
  sample: string;
  outDir?: string;
  localarchive?: {
    file: string;
    image: string;
  };
}

async function report() {
  const cwd = process.cwd();
  // read the config
  const config: ReportConfig = require(path.join(cwd, "report.config.js"));

  // load the sample file
  const samples_path = path.join(cwd, config.sample);
  const samples = JSON.parse(await fs.readFile(samples_path, "utf-8"));

  // create .coverage folder
  const coverage_path = config.outDir ?? path.join(cwd, ".coverage");
  mkdir(coverage_path);

  console.log("cp", coverage_path);

  const client = Client({
    paths: {
      file: config.localarchive.file,
      image: config.localarchive.image,
    },
  });

  const ssworker = new ScreenshotWorker({});
  await ssworker.launch();

  for (const c of samples) {
    // create .coverage/:id folder
    const coverage_set_path = path.join(coverage_path, c.id);
    mkdir(coverage_set_path);

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
      console.error("file not found", filekey);
      continue;
    }

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
      console.error("exports not ready for", filekey);
      continue;
    }

    for (const frame of frames) {
      const spinner = ora(`Running coverage for ${c.id}/${frame.id}`).start();

      // create .coverage/:id/:node folder
      const coverage_node_path = path.join(coverage_set_path, frame.id);
      mkdir(coverage_node_path);

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

        const image_b = path.join(coverage_node_path, "b.png");
        await fs.writeFile(image_b, screenshot_buffer);

        const exported = exports[frame.id];
        const image_a = path.join(coverage_node_path, "a.png");
        // download the exported image with url
        // if the exported is local fs path, then use copy instead
        if (exists(exported)) {
          // copy file with symlink
          // unlink if exists
          if (exists(image_a)) {
            await fs.unlink(image_a);
          }
          await fs.symlink(exported, image_a);
        } else {
          const dl = await axios.get(exported, { responseType: "arraybuffer" });
          await fs.writeFile(image_a, dl.data);
        }

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
          id: filekey,
          width,
          height,
          image_a: image_a,
          image_b: image_b,
          diff: {
            hitmap: diff_file,
            percent: diff.rawMisMatchPercentage,
          },
        };

        // write report.json
        const report_file = path.join(coverage_node_path, "report.json");
        await fs.writeFile(report_file, JSON.stringify(report, null, 2));

        spinner.text = `report file for ${frame.id} ➡ ${report_file}`;
        spinner.succeed();
      } catch (e) {
        console.error(e);
        spinner.fail();
      }
    }
  }

  // cleaup
  await ssworker.terminate();
}

report();
