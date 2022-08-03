import { SingleChildRenderObjectWidget } from "@reflect-ui/core";

/**
 * specifies a exportable widget. when applied to a WidgetTree, the widget will be considered as a separate widget (a function or class)
 * rather to export or not is up to the user.
 *
 * ### Usage
 * - This can be applied by the `--declare` flag on the input source
 *
 * @example
 * ```tsx
 * // from
 * function _(){
 *    return (
 *      <_1>
 *        <_2/>
 *      </_1>
 *   );
 * }
 *
 * const _1 = styled.div``
 * const _2 = styled.div``
 *
 *
 * // to (assuming the `_1` is the explicit widget)
 *
 * function _(){
 *   return (
 *    <_1>
 *    <_2/>
 *   </_1>
 *  );
 * }
 *
 * function _1({children}:{children: React.ReactNode}){
 *  return (
 *    <_1Container>
 *      {children}
 *    </_1Container>
 *  );
 * }
 *
 * const _1Container = styled.div``
 *
 * function _2(){
 *   return <_2Container/>
 * }
 *
 * const _2Container = styled.div``
 *
 * ```
 */
export class WidgetDeclarationToken extends SingleChildRenderObjectWidget {
  readonly _type = "widget-declaration";
  //
}
