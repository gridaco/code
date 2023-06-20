import fs from "fs/promises";
import path from "path";
import { Worker as ScreenshotWorker } from "@codetest/screenshot";
import type {
  FileImageResponse,
  FileImageFillsResponse,
  Frame,
} from "@design-sdk/figma-remote-types";
import { htmlcss } from "@codetest/codegen";
import { resemble } from "@codetest/diffview";
import { Client } from "./client";
import { mapper } from "@design-sdk/figma-remote";
import { convert } from "@design-sdk/figma-node-conversion";
import {
  ImageRepository,
  MainImageRepository,
} from "@design-sdk/asset-repository";
import { RemoteImageRepositories } from "@design-sdk/figma-remote/asset-repository";
import { sync } from "./utils/sync";
import { exists } from "./utils/exists";
import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "code.log", level: "error" }),
  ],
});

function cvt(node: Frame, filekey: string) {
  const _mapped = mapper.mapFigmaRemoteToFigma(node);
  const _converted = convert.intoReflectNode(_mapped, null, "rest", filekey);
  return _converted;
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

export class FrameReporter {
  readonly filekey: string;
  readonly out: string;
  readonly node: Frame;
  readonly client: Client;
  readonly ssworker: ScreenshotWorker;
  readonly exported: string;

  get reportFilePath() {
    return path.join(this.out, "report.json");
  }

  get htmlFilePath() {
    return path.join(this.out, "report.html");
  }

  get aPath() {
    return path.join(this.out, "a.png");
  }

  get bPath() {
    return path.join(this.out, "b.png");
  }

  get diffPath() {
    return path.join(this.out, "diff.png");
  }

  get width() {
    return this.node.size.x;
  }

  get height() {
    return this.node.size.y;
  }

  get fid() {
    return this.node.id;
  }

  constructor({
    node,
    filekey,
    out,
    client,
    ssworker,
    exported,
  }: {
    node: Frame;
    filekey: string;
    out: string;
    client: Client;
    ssworker: ScreenshotWorker;
    exported: string;
  }) {
    this.node = node;
    this.filekey = filekey;
    this.out = out;
    this.client = client;
    this.ssworker = ssworker;
    this.exported = exported;
  }

  async code() {
    setImageRepository(this.filekey);
    return await htmlcss(
      {
        id: this.fid,
        name: this.node.name,
        entry: cvt(this.node, this.filekey),
      },
      async ({ keys, hashes }) => {
        const assets = await Promise.all([
          this.client.fileImages(this.filekey, {
            ids: keys,
          }),
          this.client.fileImageFills(this.filekey),
        ]);

        const [exports, images] = assets.map((a) => a.data);

        const map = {
          ...(exports as FileImageResponse).images,
          ...(images as FileImageFillsResponse).meta.images,
        };

        return map;
      }
    );
  }

  async report() {
    try {
      try {
        await this.syncA();
      } catch (e) {
        return {
          error: e.message,
        };
      }

      const code = await this.code();
      // write index.html
      await fs.writeFile(this.htmlFilePath, code);

      // screenshot
      await this.ss(code, this.bPath);

      // diff
      const diff = await this.diff();

      const report = {
        community_id: this.filekey,
        filekey: "unknown",
        type: "FRAME",
        name: this.node.name,
        id: this.fid,
        width: this.width,
        height: this.height,
        image_a: "./a.png",
        image_b: "./b.png",
        reported_at: new Date().toISOString(),
        diff: {
          hitmap: "./diff.png",
          percent: diff.rawMisMatchPercentage,
        },
        engine: {
          name: "@codetest/codegen",
          version: "2023.0.0.1",
          framework: "preview",
        },
      };

      // wrie report.json
      await fs.writeFile(this.reportFilePath, JSON.stringify(report, null, 2));

      return { report };
    } catch (e) {
      logger.log("error", e);
      console.info(e);
      return {
        error: e.message,
      };
    }
  }

  async ss(code: string, path: string) {
    await this.ssworker.screenshot({
      htmlcss: code,
      viewport: {
        width: Math.round(this.width),
        height: Math.round(this.height),
      },
      path: path,
    });
  }

  async diff() {
    const diff = await resemble(this.aPath, this.bPath);
    const diff_file = path.join(this.out, "diff.png");
    // write diff.png
    await fs.writeFile(diff_file, diff.getBuffer(false));

    return diff;
  }

  async syncA() {
    // image A (original)

    await sync(this.exported, this.aPath);
    if (!(await exists(this.aPath))) {
      throw new Error(
        `Image A not found - ${this.aPath} from (${this.exported})`
      );
    }
  }
}
