import { ProxyWidget, Widget, WidgetKey } from "@reflect-ui/core";
import type { Link } from "../property-path";

export class MasterComponentWidget extends ProxyWidget {
  readonly _type: "MasterComponent" = "MasterComponent";
  readonly meta: MasterComponentMetaToken<any>;

  constructor({
    key,
    meta,
    child,
  }: {
    key?: WidgetKey;
    meta: MasterComponentMetaToken<any>;
    child: Widget;
  }) {
    super({ key, child });
    this.meta = meta;
  }
}

export class MasterComponentMetaToken<T> {
  readonly key: WidgetKey;
  /**
   * property definition
   */
  readonly properties: Property<T>[];

  /**
   * property link to design property
   */
  readonly body: T;

  constructor({
    key,
    properties,
    child,
  }: {
    readonly key: WidgetKey;
    readonly properties: Property<T>[];
    readonly child: T;
  }) {
    this.key = key;
    this.properties = properties;
    this.body = child;
  }
}

export interface Property<T> {
  key: string;
  type: any;
  defaultValue: any;
  link: PropertyLink<T>;
}

export type PropertyLink<T> =
  | InstanciationPropertyLink<T>
  | DesignPropertyLink<T>;

/**
 * Property link to a instanciation of (another) component.
 */
export interface InstanciationPropertyLink<T> {
  type: "instanciation-link";
  master: MasterComponentMetaToken<T>;
  linksto: Link;
}

export interface DesignPropertyLink<T> {
  type: "design-link";
  /**
   * path to a property as indexpath.
   * e.g. [0,1,'text[@data]']
   */
  linksto: Link;
}
