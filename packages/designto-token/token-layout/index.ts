import { nodes } from "@design-sdk/core";
import { layoutAlignToReflectMainAxisSize } from "@design-sdk/figma-node-conversion";
import * as core from "@reflect-ui/core";
import {
  Axis,
  Column,
  Stack,
  Flex,
  Row,
  VerticalDirection,
  WidgetKey,
  BoxShadowManifest,
  EdgeInsets,
  Color,
  BorderRadiusManifest,
} from "@reflect-ui/core";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";
import { keyFromNode } from "../key";
import { handleChildren } from "../main";

// type ChildrenTransformer
// type LayoutBuilder<N extends nodes.ReflectSceneNode> = (node: N, ) =>

function fromFrame(
  frame: nodes.ReflectFrameNode,
  children: Array<nodes.ReflectSceneNode>
): core.LayoutRepresntatives {
  const innerlayout = flexOrStackFromFrame(frame, children);
  const is_overflow_scrollable = isOverflowingAndShouldBeScrollable(frame);

  if (is_overflow_scrollable) {
    // wrap with single child scroll view
    const _mainaxissize = layoutAlignToReflectMainAxisSize(frame.layoutAlign);
    return new core.SingleChildScrollView({
      key: new WidgetKey({
        id: frame.id + ".scroll-wrap",
        originName: frame.name,
      }),
      child: innerlayout,
      scrollDirection: frame.layoutMode,
      mainAxisSize: _mainaxissize,
    });
  } else {
    return innerlayout;
  }
}

function flexOrStackFromFrame(
  frame: nodes.ReflectFrameNode,
  children: Array<nodes.ReflectSceneNode>
) {
  const wchildren = handleChildren(children);

  const _key = keyFromNode(frame);
  const _background = [frame.primaryColor];
  const _color = frame.primaryColor;
  const _mainaxissize = layoutAlignToReflectMainAxisSize(frame.layoutAlign);

  const initializer: Omit<IFlexManifest, "direction"> & {
    key: WidgetKey;
    boxShadow: BoxShadowManifest;
    padding: EdgeInsets;
    background?: Color[];
    color?: Color;
    borderRadius?: BorderRadiusManifest;
  } = {
    key: _key,
    width: frame.width,
    itemSpacing: frame.itemSpacing,
    height: frame.width,
    flex: frame.layoutGrow,
    mainAxisSize: _mainaxissize,
    crossAxisAlignment: frame.crossAxisAlignment,
    mainAxisAlignment: frame.mainAxisAlignment,
    verticalDirection: VerticalDirection.down,
    boxShadow: frame.primaryShadow,
    padding: frame.padding,
    background: _background,
    children: wchildren,
    color: _color,
    borderRadius: frame.cornerRadius,
  };

  if (frame.isAutoLayout) {
    switch (frame.layoutMode) {
      case Axis.horizontal:
        return new Row(initializer);
      case Axis.vertical:
        return new Column(initializer);
      default:
        console.info(`Frame: "${frame.name}" fallback to flex`);
        return new Flex({
          ...initializer,
          direction: Axis.horizontal,
        });
    }
  }

  // else, stack.
  // TODO: - convert as container if single child

  // wrap each children with positioned
  const stack_children = wchildren.map((child) => {
    const ogchild = children.find((c) => c.id === child.key.id);

    const constraint = {
      left: undefined,
      top: undefined,
      right: undefined,
      bottom: undefined,
    };

    const wh = {
      width: child.width,
      height: child.height,
    };

    const _l = ogchild.x;
    const _r = frame.width - (ogchild.x + ogchild.width);
    const _t = ogchild.y;
    const _b = frame.height - (ogchild.y + ogchild.height);

    /**
     * "MIN": Left or Top
     * "MAX": Right or Bottom
     * "CENTER": Center
     * "STRETCH": Left & Right or Top & Bottom
     * "SCALE": Scale
     */

    if (!ogchild.constraints) {
      console.error(
        `${ogchild.toString()} has no constraints. this can happen when node under group item tokenization is incomplete. this is engine's error.`,
        ogchild
      );
    } else {
      switch (ogchild.constraints.horizontal) {
        case "MIN":
          constraint.left = _l;
          break;
        case "MAX":
          constraint.right = _r;
          break;
        case "SCALE": /** scale fallbacks to stretch */
        case "STRETCH":
          constraint.left = _l;
          constraint.right = _r;
          wh.width = undefined;
          break;
        case "CENTER":
          // FIXME: should be dynamic value
          // left: calc(
          //     (100% - 1000px) * 0.5
          //   );
          // new core.Alignment(0, 0);
          // static
          constraint.left = (frame.width - ogchild.width) * 0.5;
          break;
      }
      switch (ogchild.constraints.vertical) {
        case "MIN":
          constraint.top = _t;
          break;
        case "MAX":
          constraint.bottom = _b;
          break;
        case "SCALE": /** scale fallbacks to stretch */
        case "STRETCH":
          constraint.top = _t;
          constraint.bottom = _b;
          // TODO: // wh.height = undefined;
          break;
        case "CENTER":
          // static
          constraint.top = (frame.height - ogchild.height) * 0.5;
          break; // FIXME: not handled
      }
      //  console.log(
      //    ogchild.name,
      //    "ogchild.constraints",
      //    ogchild.constraints,
      //    `${ogchild.x},${ogchild.y}`
      //  );
      //  console.log(ogchild.name, "constraint", constraint);
    }

    return new core.Positioned({
      key: new WidgetKey({
        id: child.key.id + ".positioned",
        originName: child.key.originName,
      }),
      ...constraint,
      ...wh,
      child: child,
    });
  });

  const stack = new Stack({
    key: _key,
    children: stack_children,
    width: frame.width,
    height: frame.height,
    boxShadow: frame.primaryShadow,
    padding: frame.padding,
    background: _background,
    color: _color,
  });
  return stack;
}

function fromGroup(
  group: nodes.ReflectGroupNode,
  children: Array<nodes.ReflectSceneNode>
): core.LayoutRepresntatives {
  const wchildren = handleChildren(children);
  const stack = new Stack({
    key: keyFromNode(group),
    children: wchildren,
    width: group.width,
    height: group.height,
    boxShadow: group.primaryShadow,
  });
  stack.children = wchildren;
  return stack;
}

export const tokenizeLayout = {
  fromFrame: fromFrame,
  fromGroup: fromGroup,
};

/**
 * read [docs/overflow-layout-scroll.md](docs/overflow-layout-scroll.md)
 *
 * !LIMITATIONS: this only detects if the layout should be scrollable to horizontal direction. so the container's axis must be set to horizontal also.
 * TODO: resolve above limitation
 * TODO: additional block to determin if scrollable. (somecase, overflow can be static overflow & should not be scrollable.)
 * @param frame
 * @returns
 */
function isOverflowingAndShouldBeScrollable(frame: nodes.ReflectFrameNode) {
  const children_container_size = frame.children.reduce((i, c) => c.width, 0);
  return (
    frame.isAutoLayout &&
    frame.layoutMode === Axis.horizontal &&
    // if parent is scrollable, then this frame is scrollable
    frame.width < children_container_size
  );
}
