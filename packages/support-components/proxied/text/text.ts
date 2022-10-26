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
import { Rendered } from "@reflect-ui/core/reflection";
import { TextDataProxied } from "./text-data";

interface ProxiedTextManifest extends TextManifest {
  data: TextDataProxied;
  style: Rendered<TextStyleManifest>;
  overflow: Rendered<TextOverflow>;
  textAlign: Rendered<TextAlignManifest>;
  //   textAlignVertical?: Proxied<TextAlignVerticalManifest>;
  maxLines?: Rendered<number>;
}

export class ProxiedText extends Text implements ProxiedTextManifest {
  // #region text manifest
  readonly _type: "Text" = "Text";
  readonly data: TextDataProxied;
  readonly overflow: Rendered<TextOverflow>;
  readonly style: Rendered<ITextStyle>;
  readonly textAlign: Rendered<TextAlign>;
  // textAlignVertical: TextAlignVertical;
  readonly maxLines?: Rendered<number>;
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
    key?: WidgetKey;
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

    this.data = data;
    this.overflow = overflow;
    this.style = style;
    this.textAlign = textAlign;
    this.maxLines = maxLines;

    this.width = width;
    this.height = height;
  }
}
