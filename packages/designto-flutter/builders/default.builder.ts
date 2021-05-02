import {
  ReflectRectangleNode,
  ReflectEllipseNode,
  ReflectFrameNode,
  ReflectGroupNode,
  ReflectTextNode,
} from "@bridged.xyz/design-sdk/lib/nodes/types";

import { Size, Widget } from "@bridged.xyz/flutter-builder";
import { wrapWithContainer } from "../wrappers/container.wrap";
import { wrapWithOpacity } from "../wrappers/opacity.wrap";
import { wrapWithPositioned } from "../wrappers/positioned.wrap";
import { wrapWithRotation } from "../wrappers/rotation.wrap";
import { wrapWithVisibility } from "../wrappers/visibility.wrap";

type WidgetBuildCompatNode =
  | ReflectRectangleNode
  | ReflectEllipseNode
  | ReflectFrameNode
  | ReflectGroupNode
  | ReflectTextNode;

export class WidgetBuilder {
  child: Widget;
  node: WidgetBuildCompatNode;

  constructor(args: { node: WidgetBuildCompatNode; child?: Widget }) {
    this.child = args.child;
    this.node = args.node;
  }

  wrapWithContainer(options?: { size: Size }): this {
    // do not wrap if, "text"
    if (this.node instanceof ReflectTextNode) {
      return this;
    }

    // if child is in array form, don't wrap with container.
    if (!Array.isArray(this.child)) {
      this.child = wrapWithContainer(this.node, this.child, options);
    }
    return this;
  }

  blendWithAttributes(): this {
    this.child = wrapWithVisibility(this.node, this.child);
    this.child = wrapWithRotation(this.node, this.child);
    this.child = wrapWithOpacity(this.node, this.child);

    return this;
  }

  positionInParent(parentId: string): this {
    this.child = wrapWithPositioned(this.node, this.child, parentId);
    return this;
  }
}
