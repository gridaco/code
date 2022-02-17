import {
  StylableJsxWidget,
  StylableJSXElementConfig,
  WidgetKey,
  JsxWidget,
} from "@web-builder/core";
import {
  Background,
  Border,
  BorderRadiusManifest,
  BoxShadowManifest,
  DimensionLength,
  EdgeInsets,
} from "@reflect-ui/core";
import { JSX } from "coli";
import { RNViewProps } from "../../rn-native-widgets";
import type { ViewStyle } from "react-native";
import * as css from "@web-builder/styles";
import * as styles from "../../rn-styles";

export class Container
  extends StylableJsxWidget<ViewStyle>
  implements RNViewProps
{
  children?: JsxWidget[];
  readonly style?: ViewStyle;

  borderRadius?: BorderRadiusManifest;
  border?: Border;
  margin?: EdgeInsets;

  constructor({
    key,
    ...p
  }: {
    key: WidgetKey;
    children?: Array<JsxWidget>;
  } & {
    x?: number;
    y?: number;

    width?: DimensionLength;
    height?: DimensionLength;
    minWidth?: DimensionLength;
    maxWidth?: DimensionLength;
    minHeight?: DimensionLength;
    maxHeight?: DimensionLength;

    margin?: EdgeInsets;

    background?: Background;
    borderRadius?: BorderRadiusManifest;
    boxShadow?: BoxShadowManifest[];
    border?: Border;
  }) {
    super({ key });

    this.width = p.width;
    this.height = p.height;
    this.minWidth = p.minWidth;
    this.maxWidth = p.maxWidth;
    this.minHeight = p.minHeight;
    this.maxHeight = p.maxHeight;

    this.margin = p.margin;

    this.x = p.x;
    this.y = p.y;
    this.background = p.background;
    this.borderRadius = p.borderRadius;
    this.boxShadow = p.boxShadow;
    this.border = p.border;

    this.children = p.children;
  }

  styleData(): ViewStyle {
    return {
      width: css.length(this.width),
      height: css.length(this.height),
      minWidth: css.length(this.minWidth),
      maxWidth: css.length(this.maxWidth),
      minHeight: css.length(this.minHeight),
      maxHeight: css.length(this.maxHeight),

      // originally, - "box-shadow": css.boxshadow(...(this.boxShadow ?? [])),
      ...(this.boxShadow?.length ? styles.shadow(this.boxShadow[0]) : {}),
      ...styles.background(this.background),
      ...styles.margin(this.margin),
      ...styles.padding(this.padding),
      ...styles.border(this.border, this.borderRadius),
    };
  }

  jsxConfig(): StylableJSXElementConfig {
    // TODO: add dependency loading
    return {
      type: "tag-and-attr",
      tag: JSX.identifier("View"),
    };
  }
}

export abstract class SelfClosingContainer
  extends Container
  implements Omit<Container, "children">
{
  readonly children?: undefined;
}
