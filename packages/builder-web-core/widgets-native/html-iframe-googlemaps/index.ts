import { HtmlIframe } from "../html-iframe";
import type { IIframeProps } from "../html-iframe";
import type { IWHStyleWidget } from "@reflect-ui/core";
import type { WidgetKey } from "../../widget-key";

type GoogleMapsProps = Omit<IIframeProps, "src" | "srcDoc"> & {
  q: string;
};

export class HtmlIframeGoogleMaps extends HtmlIframe {
  constructor({
    key,
    loading = "lazy",
    referrerpolicy = "no-referrer-when-downgrade",
    q,
    ...rest
  }: { key: WidgetKey } & GoogleMapsProps & IWHStyleWidget) {
    super({
      key,
      ...rest,
      loading,
      referrerpolicy,
      src: gmapurl(q),
    });
  }
}

function gmapurl(q: string, apikey?: string): string {
  // build query param
  const query = new URLSearchParams();
  query.set("q", q);
  if (apikey) {
    query.set("key", apikey);
  }

  // build url
  const url = new URL("https://www.google.com/maps/embed/v1/place");
  url.search = query.toString();

  return url.toString();
}
