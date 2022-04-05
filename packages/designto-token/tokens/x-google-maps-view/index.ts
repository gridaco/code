import { Container, WidgetKey } from "@reflect-ui/core";

export class XGoogleMapsView extends Container {
  readonly _type = "x/google-maps-view";
  readonly q: string;
  constructor({
    key,
    q = "Mountain View, California, United States", // default fallback
  }: { key: WidgetKey } & { q?: string }) {
    super({ key });

    this.q = q;
  }
}
