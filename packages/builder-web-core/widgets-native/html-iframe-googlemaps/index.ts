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
    sandbox = "allow-scripts",
    q,
    ...rest
  }: { key: WidgetKey } & GoogleMapsProps & IWHStyleWidget) {
    super({
      key,
      ...rest,
      loading,
      sandbox,
      referrerpolicy,
      src: gmapurl(q),
    });
  }
}

function gmapurl(q: string, apikey?: string): string {
  // build query param
  const query = {};
  query["q"] = q;
  if (apikey) {
    query["key"] = apikey;
    return `https://www.google.com/maps/embed/v1/place?${buildq(query)}`;
  } else {
    query["output"] = "embed";
    return `https://maps.google.com/maps?${buildq(query)}`;
  }
}

const buildq = (q: object): string =>
  Object.keys(q)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`)
    .join("&");
