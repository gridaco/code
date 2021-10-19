import {
  Text,
  ITextStyle,
  TextAlign,
  TextAlignManifest,
  TextManifest,
  TextOverflow,
  TextStyleManifest,
  WidgetKey,
} from "@reflect-ui/core";
import { Proxied } from "@reflect-ui/core/lib/_utility-types";

interface ProxiedTextManifest extends TextManifest {
  data: Proxied<string>;
  style: Proxied<TextStyleManifest>;
  overflow: Proxied<TextOverflow>;
  textAlign: Proxied<TextAlignManifest>;
  //   textAlignVertical?: Proxied<TextAlignVerticalManifest>;
  maxLines?: Proxied<number>;
}

export class ProxiedText extends Text implements ProxiedTextManifest {
  // #region text manifest
  readonly _type: "Text" = "Text";
  readonly data: Proxied<string>;
  readonly overflow: Proxied<TextOverflow>;
  readonly style: Proxied<ITextStyle>;
  readonly textAlign: Proxied<TextAlign>;
  // textAlignVertical: TextAlignVertical;
  readonly maxLines?: Proxied<number>;
  // #endregion text manifest

  width?: number;
  height?: number;

  constructor({
    key,
    data,
    overflow = TextOverflow.ellipsis,
    style,
    textAlign,
    maxLines,
    width,
    height,
  }: {
    key: WidgetKey;
    width?: number;
    height?: number;
  } & Omit<ProxiedTextManifest, "overflow"> & {
      overflow?: TextOverflow;
    }) {
    super({
      key: key,
      data,
      overflow,
      style,
      textAlign,
      maxLines,
    });

    this.width = width;
    this.height = height;
  }
}
