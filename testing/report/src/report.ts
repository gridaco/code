import os from "os";
import fs from "fs/promises";
import path from "path";
import assert from "assert";
import winston from "winston";
import chalk from "chalk";
import { Worker as ScreenshotWorker } from "@codetest/screenshot";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { fsserver } from "./serve";
import { exists } from "./utils/exists";
import { pad } from "./utils/padstr";
import { ReportConfig } from "./config";
import { Client } from "./client";
import { FrameReporter } from "./report-frame";
import Queue from "better-queue";
import { SamplesResolver, Task } from "./samples";

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
  !(await exists(path)) &&
  (await fs.mkdir(path, {
    recursive: true,
  }));

const noconsole = () => {
  // disable logging
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
};

const log = console.info;

class ReportsHandler {
  public tasks: Queue;

  constructor(
    readonly config: ReportConfig,
    readonly out: string,
    readonly client: Client,
    readonly ssworker: ScreenshotWorker,
    readonly timeout: number,
    readonly concurrency: number
  ) {
    this.tasks = new Queue(
      (task: Task, cb: () => void) => this.handle(task, cb),
      { concurrent: concurrency, maxTimeout: timeout }
    );
    // prevent from starting
    this.tasks.pause();
  }

  async handle(task: Task, cb: () => void) {
    if (task === null) {
      // end-of-data token
      console.log("End of data token received, no more tasks to process");
      console.log("Closed reporter");
      return;
    }

    const { filekey, node, a } = task;

    const logsuffix = pad(`${filekey}/${node.id}`, 32);

    try {
      // create .coverage/:id/:node folder
      const coverage_node_path = path.join(this.out, filekey, node.id);
      await mkdir(coverage_node_path);

      // report.json
      const report_file = path.join(coverage_node_path, "report.json");
      if (this.config.skipIfReportExists) {
        if (await exists(report_file)) {
          log(
            chalk.green(`☑ ${logsuffix} Skipping - report for already exists`)
          );
          return;
        }
      }

      const reporter = new FrameReporter({
        filekey: filekey,
        node: node,
        out: coverage_node_path,
        exported: a,
        client: this.client,
        ssworker: this.ssworker,
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

    cb();
  }

  async start() {
    this.tasks.resume();
  }

  async join() {
    return new Promise<void>((resolve) => {
      this.tasks.on("drain", () => {
        resolve();
      });
    });
  }
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

  const ssworker = new ScreenshotWorker({}, 20);
  await ssworker.launch();

  // setup the dir
  await mkdir(coverage_path);

  const reportHandler = new ReportsHandler(
    config,
    coverage_path,
    client,
    ssworker,
    60 * 1000,
    concurrency
  );

  const samplesResolver = new SamplesResolver(
    samples,
    client,
    reportHandler.tasks,
    concurrency * 8
  );

  samplesResolver.start();
  reportHandler.start();

  await reportHandler.join();

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
