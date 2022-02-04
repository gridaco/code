import type { Stringish } from "../_";
import type {
  RNAndroidViewProps,
  RNBubblingEventProps,
  RNDirectEventProps,
  RNGestureResponderEventProps,
  RNIOSViewProps,
  RNMouseEventProps,
  RNReactNode,
  RNTouchEventProps,
} from "../_/fixme-types";
import type {
  RNAccessibilityActionInfo,
  RNAccessibilityRole,
  RNAccessibilityState,
  RNAccessibilityValue,
} from "../view";
import type { RNEdgeInsetsOrSizeProp, RNViewStyleProp } from "../style-sheet";
type RNPointerEvents = "auto" | "box-none" | "box-only" | "none";

/**
 * @see https://github.com/facebook/react-native/blob/d682753244feba28c6a15c31966a3da075a090e6/Libraries/Components/View/ViewPropTypes.js
 */
export interface RNViewProps
  extends RNBubblingEventProps,
    RNDirectEventProps,
    RNGestureResponderEventProps,
    RNMouseEventProps,
    RNTouchEventProps,
    RNAndroidViewProps,
    RNIOSViewProps {
  children?: RNReactNode;
  style?: RNViewStyleProp;

  /**
   * When `true`, indicates that the view is an accessibility element.
   * By default, all the touchable elements are accessible.
   *
   * See https://reactnative.dev/docs/view#accessible
   */
  accessible?: boolean;

  /**
   * Overrides the text that's read by the screen reader when the user interacts
   * with the element. By default, the label is constructed by traversing all
   * the children and accumulating all the `Text` nodes separated by space.
   *
   * See https://reactnative.dev/docs/view#accessibilitylabel
   */
  accessibilityLabel?: Stringish;

  /**
   * An accessibility hint helps users understand what will happen when they perform
   * an action on the accessibility element when that result is not obvious from the
   * accessibility label.
   *
   *
   * See https://reactnative.dev/docs/view#accessibilityHint
   */
  accessibilityHint?: Stringish;

  /**
   * Indicates to accessibility services to treat UI component like a specific role.
   */
  accessibilityRole?: RNAccessibilityRole;

  /**
   * Indicates to accessibility services that UI Component is in a specific State.
   */
  accessibilityState?: RNAccessibilityState;
  accessibilityValue?: RNAccessibilityValue;

  /**
   * Provides an array of custom actions available for accessibility.
   *
   */
  accessibilityActions?: ReadonlyArray<RNAccessibilityActionInfo>;

  /**
   * Specifies the nativeID of the associated label text. When the assistive technology focuses on the component with this props, the text is read aloud.
   *
   * @platform android
   */
  accessibilityLabelledBy?: string | Array<string>;

  /**
   * Views that are only used to layout their children or otherwise don't draw
   * anything may be automatically removed from the native hierarchy as an
   * optimization. Set this property to `false` to disable this optimization and
   * ensure that this `View` exists in the native view hierarchy.
   *
   * @platform android
   * In Fabric, this prop is used in ios as well.
   *
   * See https://reactnative.dev/docs/view#collapsable
   */
  collapsable?: boolean;

  /**
   * Used to locate this view in end-to-end tests.
   *
   * > This disables the 'layout-only view removal' optimization for this view!
   *
   * See https://reactnative.dev/docs/view#testid
   */
  testID?: string;

  /**
   * Used to locate this view from native classes.
   *
   * > This disables the 'layout-only view removal' optimization for this view!
   *
   * See https://reactnative.dev/docs/view#nativeid
   */
  nativeID?: string;

  /**
   * This defines how far a touch event can start away from the view.
   * Typical interface guidelines recommend touch targets that are at least
   * 30 - 40 points/density-independent pixels.
   *
   * > The touch area never extends past the parent view bounds and the Z-index
   * > of sibling views always takes precedence if a touch hits two overlapping
   * > views.
   *
   * See https://reactnative.dev/docs/view#hitslop
   */
  hitSlop?: RNEdgeInsetsOrSizeProp;

  /**
   * Controls whether the `View` can be the target of touch events.
   *
   * See https://reactnative.dev/docs/view#pointerevents
   */
  pointerEvents?: RNPointerEvents;

  /**
   * This is a special performance property exposed by `RCTView` and is useful
   * for scrolling content when there are many subviews, most of which are
   * offscreen. For this property to be effective, it must be applied to a
   * view that contains many subviews that extend outside its bound. The
   * subviews must also have `overflow: hidden`, as should the containing view
   * (or one of its superviews).
   *
   * See https://reactnative.dev/docs/view#removeclippedsubviews
   */
  removeClippedSubviews?: boolean | null;
}

/**
 * @see https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/Components/View/View.js
 */
export class RNView implements RNViewProps {
  constructor({ ...props }: RNViewProps) {}
}
