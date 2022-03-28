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
    video,
    ...rest
  }: { key: WidgetKey } & YoutubeProps & IWHStyleWidget) {
    super({
      key,
      ...rest,
      loading,
      referrerpolicy,
      src: yturl(video),
    });
  }
}

function yturl(video: string): string {
  return `https://www.youtube.com/embed/${video}`;
}
