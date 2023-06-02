import parseArgs from "minimist";
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
import { screenshot } from "@codetest/screenshot";
import { resemble } from "@codetest/diffview";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import {
  ImageRepository,
  MainImageRepository,
} from "@design-sdk/asset-repository";
import { RemoteImageRepositories } from "@design-sdk/figma-remote/asset-repository";

setupCache(axios);

const args = parseArgs(process.argv.slice(2));

assert(args.cov, "Missing --cov argument");

const mkdir = (path: string) => !exists(path) && fs.mkdir(path);

async function report() {
  // load the coverage file
  const coverage = JSON.parse(await fs.readFile(args.cov, "utf-8"));

  // create .coverage folder
  const coverage_path = path.join(process.cwd(), ".coverage");
  mkdir(coverage_path);

  const client = Client({
    paths: {
      file: "/Volumes/WDB2TB/Data/figma-archives-v2",
      image: "/Volumes/WDB2TB/Data/figma-image-samples-500",
    },
  });

  const spinner = ora("Running coverage").start();

  for (const c of coverage) {
    // update the spinner
    spinner.text = `Running coverage for ${c.id}`;

    // create .coverage/:id folder
    const coverage_set_path = path.join(coverage_path, c.id);
    mkdir(coverage_set_path);

    const { id: filekey } = c;
    let file;
    let exports: { [key: string]: string };
    try {
      const { data } = await client.file(filekey);
      file = data;
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
      spinner.text = `Running coverage for ${c.id}/${frame.id}`;

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
        const code = await htmlcss({
          id: frame.id,
          name: frame.name,
          entry: _converted,
        });

        // write index.html
        const html_file = path.join(coverage_node_path, "index.html");
        await fs.writeFile(html_file, code);

        const screenshot_buffer = await screenshot({
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
          await fs.copyFile(exported, image_a);
          continue;
        } else {
          const dl = await axios.get(exported, { responseType: "arraybuffer" });
          await fs.writeFile(image_a, dl.data);
        }

        const diff = await resemble(image_a, image_b);
        // write diff.png
        fs.writeFile(
          path.join(coverage_node_path, "diff.png"),
          diff.getBuffer(false)
        );
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
            hitmap: diff,
            // score: score,
          },
        };

        // write report.json
        const report_file = path.join(coverage_node_path, "report.json");
        await fs.writeFile(report_file, JSON.stringify(report, null, 2));
      } catch (e) {
        console.error(e);
      }
    }
  }
}

report();
