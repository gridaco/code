import { Proxied } from "@reflect-ui/core/lib/_utility-types";

export class ParameterProxy<T> extends Proxied<T> {
  readonly key: string;
  readonly defaultValue: T;
  constructor({ key, defaultValue }: { key: string; defaultValue: T }) {
    super();

    this.key = key;
    this.defaultValue = defaultValue;
  }
}

export class ArgumentProxy<T> extends Proxied<T> {}

/**
 * e.g. in `<p>{props.text}</p>`, `props.text` is a AccessorValue
 */
interface PropertyAccessor {
  accessor: string;
}
