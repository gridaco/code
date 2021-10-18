export class MasterComponentMetaToken<T> {
  readonly key: string;
  /**
   * property definition
   */
  readonly properties: Property[];

  /**
   * property link to design property
   */
  readonly propertiesLink: PropertyLink<T>[];
  readonly child: T;

  constructor({
    key,
    properties,
    propertiesLink,
    child,
  }: {
    readonly key: string;
    readonly properties: Property[];
    readonly propertiesLink;
    readonly child: T;
  }) {
    this.key = key;
    this.properties = properties;
    this.propertiesLink = propertiesLink;
    this.child = child;
  }
}

interface Property {
  key: string;
  type: any;
  defaultValue: any;
}

interface PropertyLink<T> {
  key: string;
  link: InstanciationPropertyLink<T> | DesignPropertyLink<T>;
}

/**
 * Property link to a instanciation of (another) component.
 */
interface InstanciationPropertyLink<T> {
  type: "instanciation-link";
  master: MasterComponentMetaToken<T>;
  linksto: string;
}

interface DesignPropertyLink<T> {
  type: "design-link";
  /**
   * path to a property as indexpath.
   * e.g. [0,1,'text[@data]']
   */
  linksto: string;
}
