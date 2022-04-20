import { nodes, ReflectSceneNodeType } from "@design-sdk/core";
import { layoutAlignToReflectMainAxisSize } from "@design-sdk/figma-node-conversion";
import type { Constraints } from "@design-sdk/figma-types";
import * as core from "@reflect-ui/core";
import {
  Axis,
  Column,
  Stack,
  Flex,
  Row,
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
  IWHStyleWidget,
  Operation,
} from "@reflect-ui/core";

import { Background } from "@reflect-ui/core/lib/background";
import { IFlexManifest } from "@reflect-ui/core/lib/flex/flex.manifest";
import { TokenizerConfig } from "../config";
import { keyFromNode } from "../key";
import { handleChildren, RuntimeChildrenInput } from "../main";
import { tokenizeBackground } from "../token-background";
import { tokenizeBorder } from "../token-border";
import { Stretched } from "../tokens";
import { unwrappedChild } from "../wrappings";

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
  context: RuntimeLayoutContext,
  config: TokenizerConfig
): core.LayoutRepresntatives {
  const innerlayout = flex_or_stack_from_frame(
    frame,
    children,
    context.references,
    config
  );
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

function flex_or_stack_from_frame(
  frame: nodes.ReflectFrameNode,
  children: RuntimeChildrenInput,
  references: OriginalChildrenReference,
  config: TokenizerConfig
) {
  const wchildren = handleChildren(children, config);

  const _key = keyFromNode(frame);
  const _background = tokenizeBackground.fromFills(frame.fills);
  const _border = tokenizeBorder.fromNode(frame);
  const _mainaxissize = layoutAlignToReflectMainAxisSize(frame.layoutAlign);

  // Should this be used for flex?
  // frame.primaryAxisSizingMode;
  // frame.counterAxisSizingMode;

  const initializer: Omit<IFlexManifest, "direction"> & {
    key: WidgetKey;
    boxShadow: BoxShadowManifest[];
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
    boxShadow: frame.shadows as BoxShadowManifest[],
    padding: frame.padding,
    background: _background,
    children: wchildren,
    borderRadius: frame.cornerRadius,
    border: _border,
  };

  if (frame.isAutoLayout) {
    // const __is_this_autolayout_frame_under_autolayout_parent =
    //   frame.parent instanceof nodes.ReflectFrameNode &&
    //   frame.parent.isAutoLayout;

    /// > From the docs: https://www.figma.com/plugin-docs/api/properties/nodes-layoutalign
    /// Changing this property will cause the x, y, size, and relativeTransform properties on this node to change, if applicable (inside an auto-layout frame).
    /// - Setting "STRETCH" will make the node "stretch" to fill the width of the parent vertical auto - layout frame, or the height of the parent horizontal auto - layout frame excluding the frame's padding.
    /// - If the current node is an auto layout frame(e.g.an auto layout frame inside a parent auto layout frame) if you set layoutAlign to “STRETCH” you should set the corresponding axis – either primaryAxisSizingMode or counterAxisSizingMode – to be“FIXED”. This is because an auto - layout frame cannot simultaneously stretch to fill its parent and shrink to hug its children.
    /// - Setting "INHERIT" does not "stretch" the node.
    ///

    // TODO: inspect me. We're not 100% sure this is the correct behaviour.
    switch (frame.layoutMode) {
      case Axis.horizontal:
        if (frame.primaryAxisSizingMode === "AUTO") {
          // when horizontal, primaryAxisSizingMode is x axis
          // don't specify width
          initializer.width = undefined;
        }
        if (frame.counterAxisSizingMode === "AUTO") {
          // when horizontal, counterAxisSizingMode is y axis
          // don't specify height
          initializer.height = undefined;
        }
        return new Row(initializer);
      case Axis.vertical:
        if (frame.counterAxisSizingMode === "AUTO") {
          // when vertical, counterAxisSizingMode is x axis
          // don't specify width
          initializer.width = undefined;
        }
        if (frame.primaryAxisSizingMode === "AUTO") {
          // when vertical, primaryAxisSizingMode is y axis
          // don't specify height
          initializer.height = undefined;
        }
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
    boxShadow: frame.shadows as BoxShadowManifest[],
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
      c.id === of.key.id ||
      c.id === of.key.id.split(".")[0] || // {id}.positioned or {id}.scroll-wrap TODO: this logic can cause problem later on.
      of.key.id.includes(c.id) // other cases
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
  let constraint = {
    left: undefined,
    top: undefined,
    right: undefined,
    bottom: undefined,
  };

  /// this is a snapshot of a w, h. under logic will remove or preserve each property for constraint assignment.
  /// use unswrapped child - since the property we're trying to get is wh
  const _unwrappedChild: IWHStyleWidget = unwrappedChild(
    child
  ) as IWHStyleWidget;
  let wh = {
    width: _unwrappedChild.width,
    height: _unwrappedChild.height,
  };

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
    const _l = ogchild.x;
    const _r = container.width - (ogchild.x + ogchild.width);
    const _t = ogchild.y;
    const _b = container.height - (ogchild.y + ogchild.height);

    const res = handlePositioning({
      constraints: ogchild.constraints,
      pos: { l: _l, t: _t, b: _b, r: _r, x: ogchild.x, y: ogchild.y },
      width: ogchild.width,
      height: ogchild.height,
      containerWidth: container.width,
      containerHeight: container.height,
    });

    constraint = res.constraint;
    wh = {
      ...wh,
      ...res.wh,
    };
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

/**
 * calculates the position & constraints based on the input.
 * @param
 * @returns
 */
function handlePositioning({
  constraints,
  pos,
  width,
  height,
  containerWidth,
  containerHeight,
}: {
  constraints: Constraints;
  pos: { l: number; r: number; t: number; b: number; x: number; y: number };
  width: number;
  height: number;
  containerWidth: number;
  containerHeight: number;
}): {
  constraint;
  wh: {
    width?: number;
    height?: number;
  };
} {
  const constraint = {
    left: undefined,
    top: undefined,
    right: undefined,
    bottom: undefined,
  };
  const wh = { width, height };

  switch (constraints.horizontal) {
    case "MIN":
      constraint.left = pos.l;
      break;
    case "MAX":
      constraint.right = pos.r;
      break;
    case "SCALE": /** scale fallbacks to stretch */
    case "STRETCH":
      constraint.left = pos.l;
      constraint.right = pos.r;
      wh.width = undefined; // no fixed width
      break;
    case "CENTER":
      const half_w = width / 2;
      const centerdiff =
        // center of og
        half_w +
        pos.x -
        // center of frame
        containerWidth / 2;
      constraint.left = <Calculation>{
        type: "calc",
        operations: <Operation>{
          type: "op",
          left: {
            type: "calc",
            operations: <Operation>{
              type: "op",
              left: "50%",
              op: "+",
              right: centerdiff,
            },
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
  switch (constraints.vertical) {
    case "MIN":
      constraint.top = pos.t;
      break;
    case "MAX":
      // TODO: add this custom logic - if fixed to bottom 0 , it should be fixed rather than absolute. (as a footer)
      constraint.bottom = pos.b;
      break;
    case "SCALE": /** scale fallbacks to stretch */
    case "STRETCH":
      constraint.top = pos.t;
      constraint.bottom = pos.b;
      wh.height = undefined;
      break;
    case "CENTER":
      const half_height = height / 2;
      const container_snapshot_center = containerHeight / 2;
      const child_snapshot_center = half_height + pos.y;

      const centerdiff =
        // center of og
        child_snapshot_center -
        // center of frame
        container_snapshot_center;

      constraint.top = <Calculation>{
        type: "calc",
        operations: <Operation>{
          type: "op",
          left: {
            type: "calc",
            operations: <Operation>{
              type: "op",
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

  return { constraint, wh };
}

function fromGroup(
  group: nodes.ReflectGroupNode,
  children: RuntimeChildrenInput,
  references: OriginalChildrenReference,
  config: TokenizerConfig
): core.LayoutRepresntatives {
  const wchildren = handleChildren(children, config);

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
    boxShadow: group.shadows as BoxShadowManifest[],
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

function fromFrameOrGroup(
  node: nodes.ReflectFrameNode | nodes.ReflectGroupNode,
  children: RuntimeChildrenInput,
  context: RuntimeLayoutContext,
  config: TokenizerConfig
) {
  if (node.type === ReflectSceneNodeType.frame) {
    return fromFrame(node as nodes.ReflectFrameNode, children, context, config);
  }
  if (node.type === ReflectSceneNodeType.group) {
    return fromGroup(
      node as nodes.ReflectGroupNode,
      children,
      context.references,
      config
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
