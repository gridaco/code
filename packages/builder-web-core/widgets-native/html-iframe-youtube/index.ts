import { HtmlIframe } from "../html-iframe";
import type { IIframeProps } from "../html-iframe";
import type { IWHStyleWidget } from "@reflect-ui/core";
import type { WidgetKey } from "../../widget-key";

type YoutubeProps = Omit<IIframeProps, "src" | "srcDoc"> & {
  video: string;
};

export class HtmlIframeYoutube extends HtmlIframe {
  constructor({
    key,
    loading = "lazy",
    referrerpolicy = "no-referrer-when-downgrade",
    sandbox = ["allow-scripts", "allow-same-origin"],
    video,
    ...rest
  }: { key: WidgetKey } & YoutubeProps & IWHStyleWidget) {
    super({
      key,
      ...rest,
      loading,
      sandbox,
      referrerpolicy,
      src: yturl(video, { autoplay: true }),
    });
  }
}

function yturl(
  video: string,
  opt?: {
    autoplay?: boolean;
  }
): string {
  const q = {};

  if (opt?.autoplay) {
    q["autoplay"] = "1";
  }

  if (Object.keys(q).length > 0) {
    return `https://www.youtube.com/embed/${video}?${buildq(q)}`;
  }

  return `https://www.youtube.com/embed/${video}`;
}

const buildq = (q: object): string =>
  Object.keys(q)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`)
    .join("&");
