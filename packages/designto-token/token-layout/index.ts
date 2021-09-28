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
  Border,
  ClipRRect,
} from "@reflect-ui/core";
import { Background } from "@reflect-ui/core/lib/background";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";
import { keyFromNode } from "../key";
import { handleChildren, RuntimeChildrenInput } from "../main";
import { tokenizeBackground } from "../token-background";
import { tokenizeBorder } from "../token-border";
import { Stretched } from "../tokens";

// type ChildrenTransformer
// type LayoutBuilder<N extends nodes.ReflectSceneNode> = (node: N, ) =>

type RuntimeLayoutContext = {
  is_root: boolean;
  references?: OriginalChildrenReference;
};

type OriginalChildrenReference = Array<nodes.ReflectSceneNode>;

function fromFrame(
  frame: nodes.ReflectFrameNode,
  children: RuntimeChildrenInput,
  context: RuntimeLayoutContext
): core.LayoutRepresntatives {
  const innerlayout = flexOrStackFromFrame(frame, children, context.references);
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
  children: RuntimeChildrenInput,
  references?: OriginalChildrenReference
) {
  const wchildren = handleChildren(children);

  const _key = keyFromNode(frame);
  const _background = tokenizeBackground.fromFills(frame.fills);
  const _border = tokenizeBorder.fromNode(frame);
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
    border?: Border;
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
    border: _border,
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

  // handle overflow visibility
  const _overflow_hide = frame.clipsContent;

  const stack_children = wchildren.map((c) => {
    if (c instanceof Positioned) {
      // if already positioned, skip. - this can happen when child is positioned injected by outer tokenizer.
      return c;
    } else {
      const ogchild = find_original(
        only_original(children).concat(references || []),
        c
      );
      return stackChild({
        container: frame,
        wchild: c,
        ogchild: ogchild,
      });
    }
  });

  const stack = new Stack({
    key: _key,
    children: stack_children,
    width: frame.width,
    height: frame.height,
    boxShadow: frame.primaryShadow,
    borderRadius: frame.cornerRadius,
    border: _border,
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
      const ogchild = find_original(only_original(ogchildren), child);
      return stackChild({
        wchild: child,
        ogchild,
        container,
      });
    })
    .filter((c) => c);
}

function find_original(ogchildren: Array<nodes.ReflectSceneNode>, of: Widget) {
  if (!of) {
    throw `cannot find original if "of" widget is not provided. provided was - ${of}`;
  }
  const _unwrappedChild = unwrappedChild(of);
  const ogchild = ogchildren.find(
    (c) =>
      // target the unwrapped child
      c.id === (_unwrappedChild && _unwrappedChild.key.id) ||
      // target the widget itself - some widgets are not wrapped, yet being converted to a container-like (e.g. maskier)
      c.id === of.key.id
  );
  if (!ogchild) {
    console.error(
      `Could not find original of`,
      of,
      "from",
      ogchildren,
      "unwrapped was",
      _unwrappedChild
    );
    throw `Could not find child with id: ${of.key.id}`;
  }
  return ogchild;
}

function only_original(children: RuntimeChildrenInput) {
  return (children as Array<any>).filter((c) => c instanceof Widget === false);
}

function stackChild({
  container,
  wchild: child,
  ogchild,
}: {
  ogchild: nodes.ReflectSceneNode;
  container: nodes.ReflectSceneNode;
  wchild: core.Widget;
}) {
  const constraint = {
    left: undefined,
    top: undefined,
    right: undefined,
    bottom: undefined,
  };

  /// this is a snapshot of a w, h. under logic will remove or preserve each property for constraint assignment.
  /// use unswrapped child - since the property we're trying to get is wh
  const _unwrappedChild = unwrappedChild(child);
  const wh = {
    width: _unwrappedChild.width,
    height: _unwrappedChild.height,
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
        wh.width = undefined; // no fixed width
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

  // console.log("positioning based on constraints", { wh, constraint, child });

  return new core.Positioned({
    key: new WidgetKey({
      id: child.key.id + ".positioned",
      originName: child.key.originName,
    }),
    ...constraint,
    ...wh,
    child: child,
  });
}

function fromGroup(
  group: nodes.ReflectGroupNode,
  children: RuntimeChildrenInput,
  references?: OriginalChildrenReference
): core.LayoutRepresntatives {
  const wchildren = handleChildren(children);

  const stack_children = wchildren.map((c) => {
    if (c instanceof Positioned) {
      // if already positioned, skip. - this can happen when child is positioned injected by outer tokenizer.
      return c;
    } else {
      const ogchild = find_original(
        only_original(children).concat(references || []),
        c
      );
      return stackChild({
        container: group,
        wchild: c,
        ogchild: ogchild,
      });
    }
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
    maybeWrapped instanceof ClipRRect ||
    maybeWrapped instanceof Stretched;
  if (wrapped) {
    return unwrappedChild(maybeWrapped.child);
  }
  return maybeWrapped;
}

function fromFrameOrGroup(
  node: nodes.ReflectFrameNode | nodes.ReflectGroupNode,
  children: RuntimeChildrenInput,
  context: RuntimeLayoutContext
) {
  if (node.type === ReflectSceneNodeType.frame) {
    return fromFrame(node as nodes.ReflectFrameNode, children, context);
  }
  if (node.type === ReflectSceneNodeType.group) {
    return fromGroup(
      node as nodes.ReflectGroupNode,
      children,
      context.references
    );
  }

  throw `nor node was group or frame, "${(node as any).name}" type of "${
    (node as any).type
  }"`;
}

// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------Export region--------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
export const tokenizeLayout = {
  fromFrame: fromFrame,
  fromGroup: fromGroup,
  fromFrameOrGroup: fromFrameOrGroup,
};
// ---------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------Export region--------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
