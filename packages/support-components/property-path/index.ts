export type Link = PathLink | PathPropertyLink;

export interface PathLink {
  type: "path-link";
  path: string;
}

export interface PathPropertyLink {
  type: "path-property-link";
  path: string;
  property: PropertyLocation;
}

/**
 * e.g. `[ "fills", 0 ]` -> `fills[0]`
 */
type PropertyLocation = (IndexedPropertyLocator | NamedPropertyLocator)[];

interface IndexedPropertyLocator {
  type: "index";
  value: number;
}

interface NamedPropertyLocator {
  type: "name";
  value: string;
}
