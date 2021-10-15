import { Figma } from "@design-sdk/figma";
import { compare_instance_with_master } from "@design-sdk/diff";

type IDMappable<T> =
  | {
      [id: string]: T;
    }
  | Array<{ id: string } & T>;

function findIn<T>(map: IDMappable<T>, id: string) {
  if (Array.isArray(map)) {
    return map.find((c) => c.id === id);
  } else {
    return map[id];
  }
}

// based on default strategy
// WIP

export function make_instance_component_meta({
  entry,
  components,
}: {
  entry: Figma.InstanceNode;
  components: IDMappable<Figma.ComponentNode>;
  /**
   * other instances of the same component rather than the entry.
   */
  references?: Figma.InstanceNode[];
}) {
  if (entry.type !== "INSTANCE") {
    throw new Error("not a instance");
  }
  const diff = compare_instance_with_master({
    instance: entry,
    master: findIn(components, entry.mainComponentId),
    components: Array.from(Object.values(components)),
  });
  // TODO: make meta based on diff
  return diff;
}
