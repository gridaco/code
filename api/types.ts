import type {
  FrameworkConfig,
  VanillaFrameworkConfig,
} from "@grida/builder-config";

export type CodeResponse = FigmaToVanillaResponse;

export const LICENSE_CE = {
  "ce-use-of-generated-code": "Public Domain",
  "ce-use-of-engine-source": "Apache-2.0",
  "ce-use-for-commercial": "AGPL-3.0",
};

export type ApiEngineInfo = {
  name: "code.grida.co/api/v1";
  version: "2023.1.1";
  license: "AGPL-3.0";
};

export type D2CSourceMap = {};

export type FigmaInputPong = {
  /**
   * the id of entry node. usually it is the root node.
   */
  entry: string;
  /**
   * the full node tree, including only essential information. like size, position, etc.
   */
  node: object;
};

export interface BaseFigmaInputResponse {
  figma: FigmaInputPong;
}

export interface BaseResponse {
  framework: FrameworkConfig;
  engine: ApiEngineInfo;
  version: 0; // for now, there is no versioning
  license: typeof LICENSE_CE;
}

export interface BaseWebFrameworkResponse extends BaseResponse {
  src: string;
  srcdoc: string;
  srcmap: D2CSourceMap;
  files: {
    [key: string]: {
      content: string;
    };
  };

  thumbnail: string;
}

export interface VanillaCodeResponse extends BaseWebFrameworkResponse {
  framework: VanillaFrameworkConfig;
}

export interface FigmaToVanillaResponse
  extends VanillaCodeResponse,
    BaseFigmaInputResponse {
  figma: FigmaInputPong;
}
