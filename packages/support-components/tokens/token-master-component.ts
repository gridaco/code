import type { Link } from "../property-path";

export class MasterComponentMetaToken<T> {
  readonly key: string;
  /**
   * property definition
   */
  readonly properties: Property<T>[];

  /**
   * property link to design property
   */
  readonly child: T;

  constructor({
    key,
    properties,
    child,
  }: {
    readonly key: string;
    readonly properties: Property<T>[];
    readonly child: T;
  }) {
    this.key = key;
    this.properties = properties;
    this.child = child;
  }
}

interface Property<T> {
  key: string;
  type: any;
  defaultValue: any;
  link: PropertyLink<T>;
}

type PropertyLink<T> = InstanciationPropertyLink<T> | DesignPropertyLink<T>;

/**
 * Property link to a instanciation of (another) component.
 */
interface InstanciationPropertyLink<T> {
  type: "instanciation-link";
  master: MasterComponentMetaToken<T>;
  linksto: Link;
}

interface DesignPropertyLink<T> {
  type: "design-link";
  /**
   * path to a property as indexpath.
   * e.g. [0,1,'text[@data]']
   */
  linksto: Link;
}
