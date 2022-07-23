import type { FigmaFileKey } from "@design-sdk/figma";
import { WidgetKey } from "@reflect-ui/core";

export class FigmaWidgetKey extends WidgetKey {
  readonly filekey: FigmaFileKey;
  constructor({
    id,
    name,
    filekey,
  }: {
    id: string;
    name: string;
    filekey: FigmaFileKey;
  }) {
    super({ id, originName: name });
    this.filekey = filekey;
  }
}
