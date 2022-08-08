// primary
export const flag_key__declare = "declare";

export const flag_key_alias__declare = [flag_key__declare];

/**
 * flag with sytax `--declare`
 */
export interface DeclareSpecificationFlag {
  flag: typeof flag_key__declare;
  /**
   * rather this declaration to be exported of not. (public or not)
   */
  export?: boolean;

  /**
   * explit name to use when exporting this declaration.
   * when not provided, uses the default name with passed coli namer
   */
  identifier?: string;

  /**
   * value. of the flag (automatically handled by parser)
   * - true = declare
   * - false = don't declare
   */
  value: boolean;
  _raw?: string;
}
