import { nodes, ReflectSceneNodeType } from "@design-sdk/core";
import { layoutAlignToReflectMainAxisSize } from "@design-sdk/figma-node-conversion";
import * as core from "@reflect-ui/core";
import {
  Axis,
  Column,
  Stack,
  Flex,
  Row,
  Opacity,
  Positioned,
  Widget,
  VerticalDirection,
  WidgetKey,
  BoxShadowManifest,
  EdgeInsets,
  Color,
  BorderRadiusManifest,
  Calculation,
  Clip,
} from "@reflect-ui/core";
import { Background } from "@reflect-ui/core/lib/background";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";
import { keyFromNode } from "../key";
import { handleChildren } from "../main";
import { tokenBackground } from "../token-background";
import { Stretched } from "../tokens";

// type ChildrenTransformer
// type LayoutBuilder<N extends nodes.ReflectSceneNode> = (node: N, ) =>

function fromFrame(
  frame: nodes.ReflectFrameNode,
  children: Array<nodes.ReflectSceneNode>,
  context: {
    is_root: boolean;
  }
): core.LayoutRepresntatives {
  const innerlayout = flexOrStackFromFrame(frame, children);
  const is_overflow_scrollable = isOverflowingAndShouldBeScrollable(frame);

  if (context.is_root) {
    // add height size to root frame
    innerlayout.minHeight = "100vh";
    return innerlayout;
  }

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
  const _background = tokenBackground.fromFills(frame.fills);
  const _mainaxissize = layoutAlignToReflectMainAxisSize(frame.layoutAlign);

  // Should this be used for flex?
  // frame.primaryAxisSizingMode;
  // frame.counterAxisSizingMode;

  const initializer: Omit<IFlexManifest, "direction"> & {
    key: WidgetKey;
    boxShadow: BoxShadowManifest;
    padding: EdgeInsets;
    background?: Background;
    color?: Color;
    borderRadius?: BorderRadiusManifest;
  } = {
    key: _key,
    width: frame.width,
    height: frame.height,
    itemSpacing: frame.itemSpacing,
    flex: frame.layoutGrow,
    mainAxisSize: _mainaxissize,
    crossAxisAlignment: frame.crossAxisAlignment,
    mainAxisAlignment: frame.mainAxisAlignment,
    verticalDirection: VerticalDirection.down,
    boxShadow: frame.primaryShadow,
    padding: frame.padding,
    background: _background,
    children: wchildren,
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
  //

  // handle overflow
  const _overflow_hide = frame.clipsContent;

  const stack_children = stackChildren({
    ogchildren: children,
    wchildren: wchildren,
    container: frame,
  });

  const stack = new Stack({
    key: _key,
    children: stack_children,
    width: frame.width,
    height: frame.height,
    boxShadow: frame.primaryShadow,
    borderRadius: frame.cornerRadius,
    padding: frame.padding,
    background: _background,
    clipBehavior: _overflow_hide ? Clip.antiAlias : Clip.none,
  });
  return stack;
}

/**
 * wrap each children with positioned
 *
 * @param param0
 * @returns
 */
function stackChildren({
  container,
  wchildren,
  ogchildren,
}: {
  ogchildren: Array<nodes.ReflectSceneNode>;
  container: nodes.ReflectSceneNode;
  wchildren: core.Widget[];
}): core.Widget[] {
  return wchildren
    ?.map((child) => {
      const _unwrappedChild = unwrappedChild(child);

      const ogchild = ogchildren.find((c) => c.id === _unwrappedChild.key.id);
      if (!ogchild) {
        console.error(`Could not find child with id: ${child.key.id}`);
        throw `Could not find child with id: ${child.key.id}`;
      }

      const constraint = {
        left: undefined,
        top: undefined,
        right: undefined,
        bottom: undefined,
      };

      /// this is a snapshot of a w, h. under logic will remove or preserve each property for constraint assignment.
      const wh = {
        width: child.width,
        height: child.height,
      };

      const _l = ogchild.x;
      const _r = container.width - (ogchild.x + ogchild.width);
      const _t = ogchild.y;
      const _b = container.height - (ogchild.y + ogchild.height);

      /**
       * "MIN": Left or Top
       * "MAX": Right or Bottom
       * "CENTER": Center
       * "STRETCH": Left & Right or Top & Bottom
       * "SCALE": Scale
       */

      if (ogchild.type == ReflectSceneNodeType.group) {
        // FIXME: group should actually not be a stack, since the item's constraints are relative to parent of a group(this).
        // however, this should be fixed in the group tokenization, not in this block.
        constraint.left = ogchild.x;
        constraint.top = ogchild.y;
        // console.error("cannot add constraint to stack: group is not supported");
      } else if (!ogchild.constraints) {
        console.error(
          `${ogchild.toString()} has no constraints. this can happen when node under group item tokenization is incomplete. this is engine's error.`
        );
        // throw `${ogchild.toString()} has no constraints. this can happen when node under group item tokenization is incomplete. this is engine's error.`;
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
            const half_w = ogchild.width / 2;
            const centerdiff =
              // center of og
              half_w +
              ogchild.x -
              // center of frame
              container.width / 2;
            constraint.left = <Calculation>{
              type: "calc",
              operations: {
                left: {
                  type: "calc",
                  operations: { left: "50%", op: "+", right: centerdiff },
                },
                op: "-", // this part is different
                right: half_w,
              },
            };
            // --- we can also specify the right, but left is enough.
            // constraint.right = <Calculation>{
            //   type: "calc",
            //   operations: {
            //     left: {
            //       type: "calc",
            //       operations: { left: "50%", op: "+", right: centerdiff },
            //     },
            //     op: "+", // this part is different
            //     right: half,
            //   },
            // };
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
            wh.height = undefined;
            break;
          case "CENTER":
            const half_height = ogchild.height / 2;
            const container_snapshot_center = container.height / 2;
            const child_snapshot_center = half_height + ogchild.y;

            const centerdiff =
              // center of og
              child_snapshot_center -
              // center of frame
              container_snapshot_center;

            constraint.top = <Calculation>{
              type: "calc",
              operations: {
                left: {
                  type: "calc",
                  operations: {
                    left: "50%",
                    op: "+",
                    right: centerdiff,
                  },
                },
                op: "-", // this part is different
                right: half_height,
              },
            };
            break;
        }
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
    })
    .filter((c) => c);
}

function fromGroup(
  group: nodes.ReflectGroupNode,
  children: Array<nodes.ReflectSceneNode>
): core.LayoutRepresntatives {
  const wchildren = handleChildren(children);
  const stack_children = stackChildren({
    ogchildren: children,
    wchildren: wchildren,
    container: group,
  });
  const stack = new Stack({
    key: keyFromNode(group),
    children: stack_children,
    width: group.width,
    height: group.height,
    boxShadow: group.primaryShadow,
    padding: group.padding,
    background: undefined, // group does not have fills.
  });
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

function unwrappedChild(maybeWrapped: Widget): Widget {
  const wrapped =
    maybeWrapped instanceof Opacity ||
    maybeWrapped instanceof Positioned ||
    maybeWrapped instanceof Stretched;
  if (wrapped) {
    return maybeWrapped.child;
  }
  return maybeWrapped;
}
