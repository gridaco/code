import os from "os";
import fs from "fs/promises";
import path from "path";
import assert from "assert";
import ora from "ora";
import winston from "winston";
import pMap from "p-map";
import { mapper } from "@design-sdk/figma-remote";
import { convert } from "@design-sdk/figma-node-conversion";
import { Client as ClientFS } from "@figma-api/community/fs";
import { Client as ClientS3 } from "@figma-api/community";
import type { Document, Frame } from "@design-sdk/figma-remote-types";
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
import { fsserver } from "./serve";
import { sync } from "./utils/sync";
import { exists } from "./utils/exists";

const CI = process.env.CI;

setupCache(axios);

type ClientInterface =
  | ReturnType<typeof ClientFS>
  | ReturnType<typeof ClientS3>;

export interface GenerateReportOptions {
  port: number;
  config: string;
}

interface ReportConfig {
  sample: string;
  outDir?: string;
  localarchive?: {
    files: string;
    images: string;
  };
  skipIfReportExists?: boolean;
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

const mkdir = async (path: string) =>
  !(await exists(path)) && (await fs.mkdir(path));

const noconsole = () => {
  // disable logging
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
};

async function cleanIfDirectoryEmpty(dir: string) {
  const items = await fs.readdir(dir);
  if (items.length === 0) {
    await fs.rmdir(dir);
  }
}

function setImageRepository(filekey: string) {
  // TODO:

  MainImageRepository.instance = new RemoteImageRepositories(filekey, {});
  MainImageRepository.instance.register(
    new ImageRepository(
      "fill-later-assets",
      "grida://assets-reservation/images/"
    )
  );
}

async function reportNode({
  node,
  filekey,
  out,
  client,
  ssworker,
  exports,
}: {
  node: Frame;
  filekey: string;
  out: string;
  client: ClientInterface;
  ssworker: ScreenshotWorker;
  exports: Record<string, string>;
}) {
  const report_file = path.join(out, "report.json");

  const { x: width, y: height } = node.size;
  const { id: fid } = node;

  const _mapped = mapper.mapFigmaRemoteToFigma(node);
  const _converted = convert.intoReflectNode(_mapped, null, "rest", filekey);

  setImageRepository(filekey);

  try {
    // image A (original)
    const exported = exports[fid];
    const image_a_rel = "./a.png";
    const image_a = path.join(out, image_a_rel);

    await sync(exported, image_a);

    if (!(await exists(image_a))) {
      return {
        error: `Image A not found - ${image_a} from (${exported})`,
      };
    }

    // codegen
    const code = await htmlcss(
      {
        id: fid,
        name: node.name,
        entry: _converted,
      },
      async ({ keys, hashes }) => {
        const { data: exports } = await client.fileImages(filekey, {
          ids: keys,
        });

        const { data: images } = await client.fileImageFills(filekey);

        const map = {
          ...exports.images,
          ...images.meta.images,
        };

        // transform the path for local file url
        return Object.keys(map).reduce((acc, key) => {
          const path = map[key];
          const url = path.startsWith("http") ? path : `file://${path}`;
          return {
            ...acc,
            [key]: url,
          };
        }, {});
      }
    );

    // write index.html
    const html_file = path.join(out, "index.html");
    await fs.writeFile(html_file, code);

    const screenshot_buffer = await ssworker.screenshot({
      htmlcss: code,
      viewport: {
        width: Math.round(width),
        height: Math.round(height),
      },
    });

    const image_b_rel = "./b.png";
    const image_b = path.join(out, image_b_rel);
    await fs.writeFile(image_b, screenshot_buffer);

    const diff = await resemble(image_a, image_b);
    const diff_file = path.join(out, "diff.png");
    // write diff.png
    await fs.writeFile(diff_file, diff.getBuffer(false));

    const report = {
      community_id: filekey,
      filekey: "unknown",
      type: "FRAME",
      name: node.name,
      id: fid,
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
        version: "2023.0.0.1",
        framework: "preview",
      },
    };

    // wrie report.json
    await fs.writeFile(report_file, JSON.stringify(report, null, 2));

    return { report };
  } catch (e) {
    logger.log("error", e);
    console.info(e);
    return {
      error: e.message,
    };
  }
}

async function reportFile({
  fileinfo,
  client,
  ssworker,
  out,
  config,
  metadata,
}: {
  fileinfo: {
    id: string;
    name: string;
  };
  out: string;
  config: ReportConfig;
  client: ClientInterface;
  ssworker: ScreenshotWorker;
  metadata: {
    index: number;
    sampleSize: number;
  };
}) {
  const { id: filekey } = fileinfo;

  const file = await getFile(client, filekey);
  if (!file) {
    return;
  }

  await mkdir(out);

  const frames: ReadonlyArray<Frame> = filterFrames(file.document);

  const exports = await exporedNodesMap(
    client,
    filekey,
    ...frames.map((f) => f.id)
  );

  if (!exports) {
    return;
  }

  let ii = 0;
  for (const frame of frames) {
    ii++;

    const spinner = ora({
      text: `[${metadata.index}/${metadata.sampleSize}] Running coverage for ${fileinfo.id}/${frame.id} (${ii}/${frames.length})`,
      isEnabled: !CI,
    }).start();

    // create .coverage/:id/:node folder
    const coverage_node_path = path.join(out, frame.id);
    await mkdir(coverage_node_path);

    // report.json
    const report_file = path.join(coverage_node_path, "report.json");
    if (config.skipIfReportExists) {
      if (await exists(report_file)) {
        spinner.succeed(`Skipping - report for ${frame.id} already exists`);
        continue;
      }
    }

    const result = await reportNode({
      filekey,
      node: frame,
      out: coverage_node_path,
      exports,
      client,
      ssworker,
    });

    if (result.report) {
      spinner.succeed(`report file for ${frame.id} ➡ ${report_file}`);
    } else if (result.error) {
      spinner.fail(`error on ${frame.id} : ${result.error}`);
    } else {
      spinner.fail();
    }
  }

  // cleaup
  // if the coverage is empty, remove the folder
  cleanIfDirectoryEmpty(out);
  //
}

async function exporedNodesMap(
  client: ClientInterface,
  filekey: string,
  ...ids: string[]
) {
  try {
    return (
      await client.fileImages(filekey, {
        ids,
      })
    ).data.images;
  } catch (e) {
    return;
  }
}

async function getFile(client: ClientInterface, filekey: string) {
  try {
    const { data } = await client.file(filekey);
    return data;
  } catch (e) {
    // file not found
    return;
  }
}

function filterFrames(document: Document) {
  return document.children
    .filter((c) => c.type === "CANVAS")
    .map((c) => c["children"])
    .flat()
    .filter((c) => c.type === "FRAME");
}

export async function report(options: GenerateReportOptions) {
  if (CI) {
    noconsole();
  }

  const concurrency = os.cpus().length;

  const cwd = process.cwd();
  // read the config
  const config: ReportConfig = require(options.config);

  // load the sample file
  const samples_path = (await exists(config.sample))
    ? config.sample
    : path.join(cwd, config.sample);

  assert(
    await exists(samples_path),
    `sample file not found at ${config.sample} nor ${samples_path}`
  );

  const samples: Array<{ id: string; name: string }> = JSON.parse(
    await fs.readFile(samples_path, "utf-8")
  );

  // create .coverage folder
  const coverage_path = config.outDir ?? path.join(cwd, ".coverage");

  console.info("Starting report", {
    concurrency,
    size: samples.length,
    config: JSON.stringify(config, null, 2),
  });

  const { listen: fileserver_start, close: fileserver_close } =
    config.localarchive
      ? fsserver(config.localarchive.images)
      : { listen: () => {}, close: () => {} };

  const client = config.localarchive
    ? ClientFS({
        paths: {
          files: config.localarchive.files,
          images: config.localarchive.images,
        },
        baseURL: `http://localhost:${options.port}`,
      })
    : ClientS3();

  if (config.localarchive) {
    // Start the server
    await fileserver_start(options.port);
    console.info(`serve running at http://localhost:${options.port}/`);
  }

  const ssworker = new ScreenshotWorker();
  await ssworker.launch();

  // setup the dir
  await mkdir(coverage_path);

  let i = 0;

  await pMap(
    samples,
    async (c) => {
      i++;
      // create .coverage/:id folder
      const coverage_set_path = path.join(coverage_path, c.id);
      await reportFile({
        fileinfo: c,
        out: coverage_set_path,
        config,
        client,
        ssworker,
        metadata: {
          index: i,
          sampleSize: samples.length,
        },
      });
    },
    { concurrency }
  );

  // cleaup
  // terminate puppeteer
  await ssworker.terminate();

  // terminate local file server
  if (config.localarchive) {
    await fileserver_close();
  }
}
