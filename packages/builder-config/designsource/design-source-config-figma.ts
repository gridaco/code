type FigmaDesignSourceUrlPattern =
  | `figma://${string}`
  | `https://www.figma.com/file/${string}`
  | `https://figma.com/file/${string}`;

type FigmaFilekey = string;

type FigmaApiAuthentication =
  | { personalAccessToken: string }
  | { accessToken: string };

export interface FigmaDesignSourceConfig {
  provider: "figma";
  client: "api.figma.com" | "api.figma.grida.co";
  file: FigmaFilekey;
  /**
   * optionally provide authentication staticly.
   *
   * - personal access token
   * - access token
   */
  auth?: FigmaApiAuthentication;
}
