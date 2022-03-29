import { HtmlIframe } from "../html-iframe";
import type { IIframeProps } from "../html-iframe";
import type { IWHStyleWidget } from "@reflect-ui/core";
import type { WidgetKey } from "../../widget-key";

type OsmProps = Omit<IIframeProps, "src" | "srcDoc"> & {
  latlng: string;
};

export class HtmlIframeOpenStreetMap extends HtmlIframe {
  constructor({
    key,
    loading = "lazy",
    referrerpolicy = "no-referrer-when-downgrade",
    latlng,
    ...rest
  }: { key: WidgetKey } & OsmProps & IWHStyleWidget) {
    super({
      key,
      ...rest,
      loading,
      referrerpolicy,
      src: osmurl(latlng),
    });
  }
}

function osmurl(latlng: string | { lat: number; lng: number }): string {
  const p = typeof latlng === "string" ? latlng : `${latlng.lat},${latlng.lng}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${p}`;
}
