import { HtmlIframe } from "../html-iframe";
import type { IIframeProps } from "../html-iframe";
import type { IWHStyleWidget } from "@reflect-ui/core";
import type { WidgetKey } from "../../widget-key";

type FigmaProps = Omit<IIframeProps, "src" | "srcDoc"> & {
  latlng: string;
};

export class HtmlIframeFigma extends HtmlIframe {
  constructor({
    key,
    loading = "lazy",
    allow = "fullscreen",
    latlng,
    ...rest
  }: { key: WidgetKey } & FigmaProps & IWHStyleWidget) {
    super({
      key,
      ...rest,
      loading,
      allow,
      src: figmaurl(latlng),
    });
  }
}

function figmaurl(url: string): string {
  const re =
    /https:\/\/([\w\.-]+\.)?figma.com\/(file|proto)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/;
  if (re.test(url)) {
    return `https://www.figma.com/embed?embed_host=astra&url=${url}`;
  } else {
    return "https://figma.com/";
    //
  }
}
