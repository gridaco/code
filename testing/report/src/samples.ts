// files fetcher process
// once file is fetched, extract target nodes and put it to node queue
//
// downloader process
// screenshot process

import Queue from "better-queue";
import pMap from "p-map";
import { Client } from "./client";
import type { Document, Frame } from "@design-sdk/figma-remote-types";

export interface Task {
  filekey: string;
  node: Frame;
  a: string;
}

function filterFrames(document: Document) {
  return document.children
    .filter((c) => c.type === "CANVAS")
    .map((c) => c["children"])
    .flat()
    .filter((c) => c.type === "FRAME");
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

export class SamplesResolver {
  constructor(
    readonly samples: { id: string }[],
    readonly client: Client,
    readonly outqueue: Queue,
    readonly concurrency: number
  ) {}

  async resolve(sample: { id: string }) {
    const { id: filekey } = sample;
    try {
      const file = await this.client.getFile(filekey);
      if (!file) {
        return;
      }

      const frames: ReadonlyArray<Frame> = filterFrames(file.document);

      const exports = await exporedNodesMap(
        this.client,
        filekey,
        ...frames.map((f) => f.id)
      );

      return frames.map((frame) => {
        const task: Task = {
          filekey,
          node: frame,
          a: exports[frame.id],
        };
        return task;
      });
    } catch (e) {
      return;
    }
  }

  async start() {
    // wait 10 seconds before starting
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await pMap(
      this.samples,
      async (sample) => {
        const tasks = await this.resolve(sample);
        tasks?.filter(Boolean)?.forEach((task) => {
          this.outqueue.push(task);
        });
      },
      { concurrency: this.concurrency } // Set as needed
    );
    this.outqueue.push(null); // end-of-data token
  }
}
