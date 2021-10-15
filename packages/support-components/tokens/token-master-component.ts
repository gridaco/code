export class MasterComponentMetaToken<T> {
  readonly key: string;
  /**
   * property definition
   */
  readonly properties: Property[];

  /**
   * property link to design property
   */
  readonly propertiesLink;
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

interface PropertyLink {
  key: string;
  link: string;
}
