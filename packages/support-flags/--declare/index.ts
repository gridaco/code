// primary
export const flag_key__declare = "declare";

export const flag_key_alias__declare = [flag_key__declare];

/**
 * flag with sytax `--declare`
 */
export interface DeclareSpecificationFlag {
  flag: typeof flag_key__declare;

  value: boolean;
  _raw?: string;
}
