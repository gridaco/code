import { HtmlIframe } from "../html-iframe";
import type { IIframeProps } from "../html-iframe";
import type { IWHStyleWidget } from "@reflect-ui/core";
import type { WidgetKey } from "../../widget-key";

const webcamurl = "https://frames-appbox.vercel.app/webcam";

type WebcamProps = Omit<IIframeProps, "src" | "srcDoc"> & {};

export class HtmlIframeWebcam extends HtmlIframe {
  constructor({
    key,
    allow = "camera",
    loading = "lazy",
    referrerpolicy = "no-referrer-when-downgrade",
    sandbox = ["allow-scripts", "allow-same-origin"],
    ...rest
  }: { key: WidgetKey } & WebcamProps & IWHStyleWidget) {
    super({
      key,
      ...rest,
      allow,
      loading,
      sandbox,
      referrerpolicy,
      src: webcamurl,
    });
  }
}
