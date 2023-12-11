import { Client as ClientFS } from "@figma-api/community/fs";
import { Client as ClientS3 } from "@figma-api/community";
import { ReportConfig } from "./config";
import type { FileResponse } from "@design-sdk/figma-remote-types";

type ClientInterface =
  | ReturnType<typeof ClientFS>
  | ReturnType<typeof ClientS3>;

export class Client {
  private readonly client: ClientInterface;
  constructor(local?: { paths: ReportConfig["localarchive"]; port: number }) {
    this.client = local
      ? ClientFS({
          paths: {
            files: local.paths.files,
            images: local.paths.images,
          },
          baseURL: `http://localhost:${local.port}`,
        })
      : ClientS3();
  }

  async getFile(filekey: string) {
    try {
      const { data } = await this.client.file(filekey);
      return data;
    } catch (e) {
      // file not found
      return;
    }
  }

  async getFiles(
    ...filekeys: string[]
  ): Promise<{ [key: string]: FileResponse }> {
    // Fetch all files concurrently and await the result array
    const results = await Promise.all(
      filekeys.map((filekey) => this.getFile(filekey))
    );

    // Construct a new map from the filekeys and the result array
    return filekeys.reduce((map, key, index) => {
      return {
        ...map,
        [key]: results[index],
      };
    }, {});
  }
  //
  get fileImages() {
    return this.client.fileImages;
  }

  get fileImageFills() {
    return this.client.fileImageFills;
  }
}
