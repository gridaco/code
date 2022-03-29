import * as core from "@reflect-ui/core";
import * as web from "@web-builder/core";
import { tokens as special } from "@designto/token";

export function compose_xtended_views(
  key,
  widget:
    | special.XFigmaEmbedView
    | special.XGoogleMapsView
    | special.XOSMView
    | special.XYoutubeView,
  container?: core.Container
) {
  if (widget instanceof special.XFigmaEmbedView) {
    throw new Error("not implemented");
  }

  if (widget instanceof special.XGoogleMapsView) {
    return new web.GoogleMaps({ ...(container ?? {}), ...widget, key });
  }

  if (widget instanceof special.XOSMView) {
    throw new Error("not implemented");
  }

  if (widget instanceof special.XYoutubeView) {
    return new web.Youtube({ ...(container ?? {}), ...widget, key });
  }

  throw new Error("not implemented");
}