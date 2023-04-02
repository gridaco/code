import { reactnative } from "@grida/builder-config";
import { WidgetKey } from "@web-builder/core";
import { SvgWithPathElement, SvgXmlElement } from "../../rn-svg";

export function SvgElement(
  p: {
    key: WidgetKey;
    width: number;
    height: number;
    data: string;
    fill;
    stroke?;
  },
  {
    config,
  }: {
    config: reactnative.ReactNativeSvgConfig;
  }
) {
  switch (config.prefer_mode) {
    case "svg-with-path":
      return new SvgWithPathElement(p);
    case "svg-xml":
      return new SvgXmlElement({ ...p, xml: p.data });
    default:
      return new SvgWithPathElement(p);
  }
}
