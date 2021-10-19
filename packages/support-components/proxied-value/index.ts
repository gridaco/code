export type ProxiedValue<T> = T | (() => T) | AccessorValue;

/**
 * e.g. in `<p>{props.text}</p>`, `props.text` is a AccessorValue
 */
interface AccessorValue {
  accessor: string;
}
