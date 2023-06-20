import os from "os";
import fs from "fs/promises";
import path from "path";
import assert from "assert";
import winston from "winston";
import chalk from "chalk";
import pMap from "p-map";
import type { Document, Frame } from "@design-sdk/figma-remote-types";
import { Worker as ScreenshotWorker } from "@codetest/screenshot";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { fsserver } from "./serve";
import { exists } from "./utils/exists";
import { pad } from "./utils/padstr";
import { ReportConfig } from "./config";
import { Client } from "./client";
import { FrameReporter } from "./report-frame";

const CI = process.env.CI;

setupCache(axios);

export interface GenerateReportOptions {
  port: number;
  config: string;
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

const log = console.info;

async function cleanIfDirectoryEmpty(dir: string) {
  const items = await fs.readdir(dir);
  if (items.length === 0) {
    await fs.rmdir(dir);
  }
}

async function reportFile({
  fileinfo,
  client,
  ssworker,
  out,
  config,
  metadata,
  concurrency = 1,
}: {
  fileinfo: {
    id: string;
    name: string;
  };
  out: string;
  config: ReportConfig;
  client: Client;
  ssworker: ScreenshotWorker;
  concurrency?: number;
  metadata: {
    index: number;
    sampleSize: number;
  };
}) {
  const { id: filekey } = fileinfo;

  const file = await client.getFile(filekey);
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

  await pMap(
    frames,
    async (frame) => {
      const logsuffix = pad(`${fileinfo.id}/${frame.id}`, 32);

      try {
        // create .coverage/:id/:node folder
        const coverage_node_path = path.join(out, frame.id);
        await mkdir(coverage_node_path);

        // report.json
        const report_file = path.join(coverage_node_path, "report.json");
        if (config.skipIfReportExists) {
          if (await exists(report_file)) {
            log(
              chalk.green(`☑ ${logsuffix} Skipping - report for already exists`)
            );
            return;
          }
        }
        const reporter = new FrameReporter({
          filekey,
          node: frame,
          out: coverage_node_path,
          exported: exports[frame.id],
          client,
          ssworker,
        });

        const result = await reporter.report();

        if (result.report) {
          log(chalk.green(`☑ ${logsuffix} Reported ➡ ${report_file}`));
        } else if (result.error) {
          log(chalk.red(`☒ ${logsuffix} Error: ${result.error}`));
        } else {
          log(chalk.red(`☒ ${logsuffix} Unknown Error`));
        }
      } catch (e) {
        log(chalk.red(`☒ ${logsuffix} System Error: ${e.message}}`));
      }
    },
    { concurrency }
  );

  // cleaup
  // if the coverage is empty, remove the folder
  cleanIfDirectoryEmpty(out);
  //
}

async function exporedNodesMap(
  client: Client,
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

  const starttime = Date.now();

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

  const client = new Client(
    config.localarchive
      ? { paths: config.localarchive, port: options.port }
      : null
  );

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
        concurrency: concurrency,
      });
    },
    { concurrency: 1 }
  );

  // cleaup
  // terminate puppeteer
  await ssworker.terminate();

  // terminate local file server
  if (config.localarchive) {
    await fileserver_close();
  }

  const endtime = Date.now();

  log(
    chalk.bgGreen(
      `✓ Done in ${(endtime - starttime) / 1000}s. Coverage at ${coverage_path}`
    )
  );
}
