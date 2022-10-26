export type JsxFunctionalComponentDeclarationConfig =
  JsxFunctionalComponentDeclarationStyle;

interface JsxFunctionalComponentDeclarationStyle {
  // props: {} vs {} : {}
  props_parameter_style: UnwrappedPropsCodeStyle;
}

interface UnwrappedPropsCodeStyle {
  style: "unwrapped-props";
}
