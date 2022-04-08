import { Container } from "@reflect-ui/core";
import type { WidgetKey } from "@reflect-ui/core";

const __sf_latlng = "37.8,-122.4" as const;
export class XOSMView extends Container {
  readonly _type = "x/osm-view";
  readonly latlng: string;
  constructor({
    key,
    latlng = __sf_latlng, // sf
  }: { key: WidgetKey } & {
    latlng?: string;
  }) {
    super({ key });
    this.latlng = validate_latlng(latlng, __sf_latlng);
  }
}

/**
 * validates latlng string format, throws if invalid (unless fallback is provided)
 * @param latlng
 * @param fallback
 * @returns
 */
function validate_latlng(latlng: string, fallback?: string): string {
  if (latlng.split(",").length !== 2) {
    if (fallback) {
      return fallback;
    }
    throw new Error(
      `invalid latlng string "${latlng}", must be in the format "lat,lng"`
    );
  }

  return latlng;
}
