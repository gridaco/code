import {
  SingleChildRenderObjectWidget,
  Widget,
  WidgetKey,
} from "@reflect-ui/core";
import type {
  Alignment,
  TMatrix4,
  Offset,
  Transform,
  BoxFit,
  ImageRepeat,
  ImageManifest,
} from "@reflect-ui/core";

export type BackgroundImageManifest = ImageManifest;

/**
 * A wrapper utility widget for representing a container with a background image.
 * For BackgroundImage type, @see {@link BackgroundImageManifest}
 *
 * - This widget holds only one src. To use multiple src, you have to nest this widget.
 * - This widget contains information to only the image and the child.
 */
export class BackgroundImage
  extends SingleChildRenderObjectWidget
  implements BackgroundImageManifest
{
  readonly src: string;
  readonly alignment?: Alignment;
  readonly fit?: BoxFit;
  readonly repeat?: ImageRepeat;
  semanticLabel?: string;

  constructor({
    key,
    child,
    //
    alignment,
    fit,
    repeat,
    src,
    semanticLabel,
  }: BackgroundImageManifest & { key?: WidgetKey; child: Widget }) {
    super({ key, child });

    this.alignment = alignment;
    this.fit = fit;
    this.repeat = repeat;
    this.src = src;
    this.semanticLabel = semanticLabel;
  }
}

/**
 * A wrapper utility widget for representing a container with a background image with transform attribute.
 * To apply transform in the background, often we use pseudo element in CSS. or Stack in Flutter.
 * This token is used to tell the interpreter to explicitly handle the transform with tree modification.
 *
 * The interpretation of this widget is as follows:
 * - css: pseudo element with transform
 * - flutter: Stack with Transform
 *
 * The interpreter should not handle the {@link Transform}'s property as the {@link BackgroundImage}'s property.
 */
export class TransformedBackgroundImage
  extends SingleChildRenderObjectWidget
  implements Transform, BackgroundImage
{
  // transform
  /**
   * transform-origin in css. In {@link TransformedBackgroundImage}, the image itself cannot contain the {@link alignment} property.
   */
  alignment?: Alignment;
  origin?: Offset;
  transform: TMatrix4;

  // image
  src: string;
  semanticLabel?: string;

  constructor({
    key,
    child,
    //
    alignment,
    origin,
    transform,
    src,
  }: Transform &
    BackgroundImage & {
      key?: WidgetKey;
      child: Widget;
    }) {
    super({ key, child });

    this.alignment = alignment;
    this.origin = origin;
    this.transform = transform;
    this.src = src;
  }
}
