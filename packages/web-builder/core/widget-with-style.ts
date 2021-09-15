import { Widget, IMultiChildWidget, WidgetKey } from "./widget";
import { JSXAttributes, JSXIdentifier } from "coli";
import { CSSProperties } from "@coli.codes/css";
import { ColiObjectLike } from "@coli.codes/builder";
import {
  EdgeInsets,
  IBoxShadowWidget,
  IEdgeInsetsWidget,
  IPositionedWidget,
  IWHStyleWidget,
} from "@reflect-ui/core";
import { BoxShadowManifest } from "@reflect-ui/core/lib/box-shadow";
import { BackgroundPaintLike } from "@reflect-ui/core/lib/background";

export interface JSXElementConfig {
  tag: ColiObjectLike<JSXIdentifier>;
  attributes?: JSXAttributes;
}

export interface IWidgetWithStyle {
  styleData(): CSSProperties;
  jsxConfig(): JSXElementConfig;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class WidgetWithStyle
  extends Widget
  implements
    IWHStyleWidget,
    IPositionedWidget,
    IBoxShadowWidget,
    IEdgeInsetsWidget {
  // IWHStyleWidget
  width?: number;
  height?: number;

  background?: BackgroundPaintLike[];

  // IPositionWidget
  x?: number;
  y?: number;

  // IBoxShadowWidget
  boxShadow?: BoxShadowManifest;

  // IEdgeInsetsWidget
  margin?: EdgeInsets;
  padding?: EdgeInsets;

  abstract styleData(): CSSProperties;

  abstract jsxConfig(): JSXElementConfig;
}

/**
 * Since html based framework's widget can be represented withou any style definition, this WidgetWithStyle class indicates, that the sub instance of this class will contain style data within it.
 */
export abstract class MultiChildWidgetWithStyle
  extends WidgetWithStyle
  implements IWidgetWithStyle, IMultiChildWidget {
  readonly children: Array<WidgetWithStyle> = [];

  constructor({ key }: { key: WidgetKey }) {
    super({ key: key });
  }
  abstract styleData(): CSSProperties;

  abstract jsxConfig(): JSXElementConfig;
}
