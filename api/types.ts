import type {
  FrameworkConfig,
  VanillaFrameworkConfig,
} from "@grida/builder-config";
import { LICENSE_CE } from "./license";
import type { TPlugin } from "@code-plugin/core";

export type FigmaNodeInput =
  | string
  | { url: string; version: string }
  | { filekey: string; node: string; version: string };

type DebugOptions = {
  /**
   * if true, the response will be a vanilla html without other data.
   * @default false
   */
  raw?: boolean;
};

export type CodeRequest = DebugOptions & {
  figma: FigmaNodeInput;
  framework: Partial<FrameworkConfig>;
  plugins?: TPlugin[];
};

export type CodeResponse = FigmaToVanillaResponse;

export type ApiEngineInfo = {
  name: "code.grida.co/api/v1";
  version: "2023.1.1";
  license: "AGPL-3.0";
};

export type D2CSourceMap = {};

export type FigmaOriginalFileData = {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
};

export type FigmaInputPong = {
  file?: FigmaOriginalFileData;
  filekey: string;
  /**
   * the id of entry node. usually it is the root node.
   */
  entry: string;
  /**
   * the full node tree, including only essential information. like size, position, etc.
   */
  node?: object;
  json?: object;
};

export interface BaseFigmaInputResponse {
  figma: FigmaInputPong;
}

export interface BaseResponse {
  framework: FrameworkConfig;
  engine: ApiEngineInfo;
  version: 0; // for now, there is no versioning
  license: typeof LICENSE_CE;
  warnings: string[];
}

export interface BaseWebFrameworkResponse extends BaseResponse {
  src?: string | null;
  srcdoc?: string | null;
  srcmap?: D2CSourceMap | null;
  files: {
    [key: string]: string;
  };

  thumbnail?: string;
}

export interface VanillaCodeResponse extends BaseWebFrameworkResponse {
  framework: VanillaFrameworkConfig;
}

export interface FigmaToVanillaResponse
  extends VanillaCodeResponse,
  BaseFigmaInputResponse {
  figma: FigmaInputPong;
}
