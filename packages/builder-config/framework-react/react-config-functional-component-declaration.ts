export type ReactFunctionalComponentDeclarationConfig = ReactFunctionalComponentDeclarationStyle;

interface ReactFunctionalComponentDeclarationStyle {
  // props: {} vs {} : {}
  props_parameter_style: UnwrappedPropsCodeStyle;
}

interface UnwrappedPropsCodeStyle {
  style: "unwrapped-props";
}
